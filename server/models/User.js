const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    auth0Id: {type: String, required: true, unique: true },
    username: { type: String },
    watchlist: { type: [String], default: [] },
    friends: { type: [String], default: [] }
});

module.exports = mongoose.model('User', userSchema);