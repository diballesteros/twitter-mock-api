const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    userId: String,
    tweetId: String
});

module.exports = mongoose.model('Like', likeSchema);
