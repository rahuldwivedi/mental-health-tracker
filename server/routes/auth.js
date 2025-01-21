const express = require("express");
const passport = require('passport');
const router = express.Router();
const cors = require('cors');

router.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from React frontend (localhost:3000)
    credentials: true,  // Allows credentials (cookies) to be included in the CORS requests
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization', 'Set-Cookie'],  // Allowed headers in CORS
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']  // Supported HTTP methods for CORS
}));

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect(`http://localhost:3000/dashboard'`);
    }
);

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.redirect('/');
        res.redirect('/');
    });
});

router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello ${req.user.name}`);
    } else {
        res.redirect('/');
    }
});

module.exports = router;
