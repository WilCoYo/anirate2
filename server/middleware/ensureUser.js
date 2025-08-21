const express = require('express');
const User = require('../models/User');
const authenticate = require('./authenticate');
const app = express();



async function ensureUser(req, res, next) {
    try {
        const auth0Id = req.auth.payload.sub;
        let user = await User.findOne({ auth0Id });

        if(!user) {
            user = await User.create({
                auth0Id,
                username:
                    req.auth.payload.name ||
                    req.auth.payload.nickname || 
                    req.auth.payload.email?.split('@')[0] || 
                    "New User",
                watchlist: [],
                friends: []
            });
            console.log("New User Created", user);
        } else {
            console.log("Existing user found:", user.username)
        }

        req.userRecord = user;
        next();
    } catch (err) {
        console.error("Error ensuring user:", err);
        res.status(500).json({ error: "Error creating or fetching user" })
    }


    app.get('/api/test-user', authenticate, ensureUser, (req, res) => {
    res.json({ message: "User Created!", user: req.userRecord })
})
}

module.exports = ensureUser; 