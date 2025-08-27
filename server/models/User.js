const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    auth0Id: {type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String },
    watchlist: [{ type: String }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);