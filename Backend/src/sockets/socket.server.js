const { Server } = require("socket.io");
// Assuming you have a session middleware that sets req.session and req for cookies 
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");


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

            // ham message ko database me store karenge  USER KA MESSAGE HONGA
            await messageModel.create({
                chat: messagePayload.chat,
                user: socket.user._id,
                content: messagePayload.content,
                role: 'user'
            });


            // ab ham chat history ko fetch karenge jis user me pahle kiya honga pahle ham usko padenge fir response generate karenge
            //ham short term memory ko direct use nhi kar sakte isme restriction hote hai isiliye ham ise array of object me covert karenge jisme mainly do cheeze hongi ek role:'user' aur parts:[{content:message}];
            //map ka use kiya hai taki sirf role aur content hi aaye

            const chatHistory = (await messageModel.find({
                chat: messagePayload.chat
            }).sort({ createdAt: -1 }).limit(10).lean()).reverse();
            



            const response = await aiService.generateResponse(chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            }));
         
            // ab ham ai ka response bhi database me store karenge AI KA RESPONSE HONGA      
            await messageModel.create({
                chat: messagePayload.chat,
                user: socket.user._id, // ai ka response hai isliye null hoga 
                content: response,
                role: 'model'
            });

            socket.emit('ai-response', {
                content: response,
                Chat: messagePayload.Chat
            });
        })
    });

}

module.exports = initSocketServer;