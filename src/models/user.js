const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    joinDate: String,
    displayName: String,
    picture: String
})

module.exports = mongoose.model('User', userSchema);