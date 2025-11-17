require("dotenv").config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const initSocketServer = require('./src/sockets/socket.server');
//create a server instance
const httpServer = require('http').createServer(app);


// Connect to the database
connectDB();

//initialize socket server
initSocketServer(httpServer);



httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});