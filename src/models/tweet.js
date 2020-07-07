const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    content: String,
    date: String,
    userId: String
});

module.exports = mongoose.model('Tweet', tweetSchema);
