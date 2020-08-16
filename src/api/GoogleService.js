const express   = require('express');
const router = express.Router();
const passport = require('passport');
app.get('/',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });