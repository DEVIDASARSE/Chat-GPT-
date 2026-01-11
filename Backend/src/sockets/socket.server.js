const { Server } = require("socket.io");
// Assuming you have a session middleware that sets req.session and req for cookies 
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");
// const { chat } = require("@pinecone-database/pinecone/dist/assistant/data/chat");


function initSocketServer(httpServer) {
    const io = new Server(httpServer, {});

    io.use(async (socket, next) => {
        //||  kabhi kabhicookie undifined aa sakta hai isliye optional chaining use kiya hai aur ise parse ke ander pass ker dete hai to vo error return ker deta hai  
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

        if (!cookies.token) {
            next(new Error("Authentication error: No token provided"));
        }
        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
            // Use decoded.userId instead of decoded.id
            const user = await userModel.findById(decoded.userId);
            socket.user = user;
            next();
        } catch (error) {
            next(new Error("Authentication error: Invalid token"));
        }

    });

    io.on('connection', (socket) => {

        // isme ham check karenge ki chat kis user ki hai aur hamara content kya hai ai-message event ke ander payload hamara chat aur container hai 
        socket.on('ai-message', async (messagePayload) => {

            /*                  
                messagePayload = {
                   chat: chatId,
                   content: message text 
                 
                }
                     
            */

            console.log(messagePayload);
            // Check if socket.user is set
            if (!socket.user) {
                console.error("Socket user is null. Authentication failed or user not found.");
                return socket.emit('error', { message: 'User not authenticated' });
            }


            //MESSAGE AUR VECTOR AND CREATE MEMORY THREE KO EK SATH  BANANE HAI ISILIYE PROMISE.ALL KA USE KIYA HAI TAKI DONO EK SAATH BAN JAYE
            const [message, vectors] = await Promise.all([
                messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: messagePayload.content,
                    role: 'user'
                }),
                aiService.generateVector(messagePayload.content)
            ]);


            await createMemory({
                vectors,
                messageId: message._id, // Corrected key
                metadata: {
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    text: messagePayload.content // additional metadata if needed
                }
            })

            // ab ham memory aur chat history dono ko ek sath le kar aayenge kyoki hamai dono ki jarurat padegi ai se response generate karne ke liye sath hi sath ham limit bhi laga denge taki jyada data na aaye aur performance pr effect na pade
            const [memory, chatHistory] = await Promise.all([

                queryMemory({
                    queryVector: vectors,
                    limit: 2,
                    metadata: {
                        user: socket.user._id,// user se related hi memory chahiye
                    }
                }),
                messageModel.find({
                    chat: messagePayload.chat
                }).sort({ createdAt: -1 }).limit(10).lean().then(messages => messages.reverse())

            ])




            const stm = chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            })

            const ltm = [
                {
                    role: 'user',
                    parts: [{
                        text: `
                        
                        these are some previous message from the chat, use them to generate response

                        ${memory.map(item => item.metadata.text).join('\n')}

                        `}]
                }
            ]

            // console.log(ltm[ 0 ]);
            // console.log(stm);
            // ab ham ai se response generate karenge
            const response = await aiService.generateResponse([...ltm, ...stm]);

            socket.emit('ai-response', {
                content: response,
                Chat: messagePayload.Chat
            });

            // ab ham respnsemessage aur responsevectors ko ek sath banayenge
            const [responseMessage, responseVectors] = await Promise.all([
                messageModel.create({
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    content: response,
                    role: 'model'
                }),
                aiService.generateVector(response)
            ]);

            await createMemory({
                vectors: responseVectors,
                messageId: responseMessage._id, // Corrected key
                metadata: {
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    text: response // additional metadata if needed
                }


            });

        })
    });

}

module.exports = initSocketServer;