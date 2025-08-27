const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    auth0Id: {type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String },


    watchlist: [
        { 
           mal_id: Number,
           title: String,
           status: { type: String, enum: ['watching', 'completed', 'to be watced'] } 
        }],


    friends: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
});

module.exports = mongoose.model('User', userSchema);