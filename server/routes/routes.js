const express = require('express');
const authenticate = require('./authenticate');
const ensureUser = require('./ensureUser');
const router = express.Router();

router.get('/api/test-user', authenticate, ensureUser, (req, res) => {
    res.json({ message: "User Created or Found! ", user: req.user })
});

module.exports = router;