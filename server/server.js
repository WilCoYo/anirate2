const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('express-oauth2-jwt-bearer');
const ensureUser = require('./middleware/ensureUser');
const User = require('./models/User');
require('dotenv').config();


const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
    console.log('Using database:', mongoose.connection.name);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
})

// Auth0 JWT Authentication

const authenticate = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: 'RS256',
});

// Create api/me route
app.get('/api/test-user', authenticate, ensureUser, (req, res) => {
  res.json({ 
    message: "User Created!", 
    user: req.userRecord 
  });
});




// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

