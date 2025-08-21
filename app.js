const express = require('express')
const mongoose = require('mongoose');
const { auth } = require('express-0auth2-jwt-bearer');
const ensureUser = require('./middleware/ensureUser');

const app = express();

app.use(express.json());

const checkJwt = auth({
    audience: "https://dev-jkly4ia4zrmtofzn.us.auth0.com/api/v2/",
    issuerBaseURL: 'dev-jkly4ia4zrmtofzn.us.auth0.com'
});

app.use(checkJwt);
app.use(ensureUser);


app.get('/watchlist', async (req, res) => {
    res.json(req.userRecord.watchlist);
});


mongoose.connect('mongodb+srv://wilcoyonkin:AOccXseyWbkyZhIt@anirate.mx7t5zp.mongodb.net/?retryWrites=true&w=majority&appName=AniRate')
    .then(() =>{
        app.listen(4000, () => console.log('Server running on http://localhost:4000'));
    })
    .catch(err => console.error('MongoDB connection error:', err))