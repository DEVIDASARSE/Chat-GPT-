const { Server } = require("socket.io");
// Assuming you have a session middleware that sets req.session and req for cookies 
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");


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
            const user = await userModel.findById(decoded.id);

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

            const response = await aiService.generateResponse(messagePayload.content);
            socket.emit('ai-response', {
                content: response,
                Chat: messagePayload.Chat
            })
        })
    });

}

module.exports = initSocketServer;