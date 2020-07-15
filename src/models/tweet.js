const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    content: String,
    date: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    replyTweet: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }
});

module.exports = mongoose.model('Tweet', tweetSchema);
