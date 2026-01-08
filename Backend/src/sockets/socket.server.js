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

            // ham message ko database me store karenge  USER KA MESSAGE HONGA (input message)
            const message = await messageModel.create({
                chat: messagePayload.chat,
                user: socket.user._id,
                content: messagePayload.content,
                role: 'user'
            });


            //user yaha per jo bhi message use ham memory ke ander save karenge uske vector banayenge {createMemory, queryMemory}  isme se createMemory use karenge use ke input pe
            const vectors = await aiService.generateVector(messagePayload.content);

            const memory = await queryMemory({
                queryVector: vectors,
                limit: 2,
                metadata: {
                    user: socket.user._id,// user se related hi memory chahiye
                }
            });

            await createMemory({
                vectors: vectors,
                messageId: message._id, // You can use a UUID or any unique identifier
                metadata: {
                    chatId: messagePayload.chat,
                    user: socket.user._id,
                    text: messagePayload.content// additional metadata if needed
                }
            });



            

            // ab ham chat history ko fetch karenge jis user me pahle kiya honga pahle ham usko padenge fir response generate karenge
            //ham short term memory ko direct use nhi kar sakte isme restriction hote hai isiliye ham ise array of object me covert karenge jisme mainly do cheeze hongi ek role:'user' aur parts:[{content:message}];
            //map ka use kiya hai taki sirf role aur content hi aaye

            const chatHistory = (await messageModel.find({
                chat: messagePayload.chat
            }).sort({ createdAt: -1 }).limit(10).lean()).reverse();


            const stm = chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            })

            const ltm = [
                {
                    role: 'user',
                    parts: [{text: `
                        
                        these are some previous message from the chat, use them to generate response

                        ${memory.map(item => item.metadata.text).join('\n')}

                        `}]
                }
            ]
           
            console.log(ltm[ 0 ]);
            console.log(stm);
            // ab ham ai se response generate karenge
            const response = await aiService.generateResponse([ ...ltm, ...stm]);

            // ab ham ai ka response bhi database me store karenge AI KA RESPONSE HONGA  (output message)    
            const responseMessage = await messageModel.create({
                chat: messagePayload.chat,
                user: socket.user._id, // ai ka response hai isliye null hoga 
                content: response,
                role: 'model'
            });



            const responseVectors = await aiService.generateVector(response);
            await createMemory({
                vectors: responseVectors,
                messageId: responseMessage._id, // Corrected key
                metadata: {
                    chatId: messagePayload.chat,
                    user: socket.user._id,
                    text: response // additional metadata if needed
                }
            })

            socket.emit('ai-response', {
                content: response,
                Chat: messagePayload.Chat
            });
        })
    });

}

module.exports = initSocketServer;