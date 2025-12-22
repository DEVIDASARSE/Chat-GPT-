const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    content:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user', 'model', 'system'],// model means ai ka response     
        default: 'user',// by default user hoga 
    },
}, { timestamps: true
 
})

const messageModel = mongoose.model('Message', messageSchema);
module.exports = messageModel;