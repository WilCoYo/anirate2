const express = require('express');
const User = require('../models/User');
const authenticate = require('./authenticate');
const app = express();



async function ensureUser(req, res, next) {
    try {
        const auth0Id = req.auth.payload.sub;
        const email = req.auth[`${process.env.AUTH0_NAMESPACE}/email`] || req.auth.email;

        const username = 
            req.auth.payload.nickname ||
            req.auth.payload.given_name ||
            req.auth.payload.name ||
            `user_${Date.now()}`;


        let user = await User.findOne({ auth0Id });

        if(!user) {
            




            user = new User({
                auth0Id,
                email,
                username,
                watchlist: [],
                friends: []
            });
            await user.save();

            console.log("New User Created", user);
        } else {
            console.log("Existing user found:", user.username)
        }

        req.user = user;
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