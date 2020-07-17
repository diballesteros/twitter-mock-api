const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    replyTweet: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }
});

module.exports = mongoose.model('Tweet', tweetSchema);
