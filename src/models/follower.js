const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followerSchema = new Schema({
    userId: String,
    followerUserId: String
});

module.exports = mongoose.model('Follower', followerSchema);
