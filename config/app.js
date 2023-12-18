const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();

require('dotenv').config();

const userRoutes = require('../app/routes/userRoutes');
const problemRoutes = require('../app/routes/problemRoutes');
const answerRoutes = require('../app/routes/answerRoutes');

app.use(cors());

app.use(function(req, res, next) {
    // Set CORS headers
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
})



// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./passport')(passport);

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/answers', answerRoutes);

module.exports = app;