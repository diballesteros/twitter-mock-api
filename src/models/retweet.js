const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const retweetSchema = new Schema({
	userId: String,
	tweetId: String,
});

module.exports = mongoose.model('Retweet', retweetSchema);
