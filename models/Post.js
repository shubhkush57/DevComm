const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    text:{
        type: String,
        required: true
    },
    name:{
        type: String,
    },
    avatar:{
        type: String
    },
    likes:[
        {
            user:{
                type: mongoose.Types.ObjectId,
                ref: 'user'
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    comments:[
        {
            user:{
                type: mongoose.Types.ObjectId,
                ref: 'user'
            },
            text:{
                type: String,
                required: true
            },
            date:{
                type: Date,
                default: Date.now
            },
            name: {
                type: String
              },
            avatar: {
                type: String
            },
        }
    ],
    date:{
        type: Date,
        default: Date.now
    }

});
module.exports = Post = mongoose.model('post',postSchema);