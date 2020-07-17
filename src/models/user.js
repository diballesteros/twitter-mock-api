const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    joinDate: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    picture: String,
    tweets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
})

module.exports = mongoose.model('User', userSchema);