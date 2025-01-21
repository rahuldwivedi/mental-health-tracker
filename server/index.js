const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const db = require('./database/db');
const authRouter = require('./routes/auth');
const logRouter = require('./routes/logs');


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors({
  origin: 'http:localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,  // Strong secret for encryption
  resave: false,
  saveUninitialized: true,
  cookie: { 
      maxAge: 3600000,  // 1-hour session duration
      secure: false,    // Set to true in production for HTTPS
      httpOnly: true,   // Prevents JavaScript from accessing the cookie
  }
}));


const logsRouter = require("./routes/logs");

io.on('connection', (socket) => {
  console.log('New client connected');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
function(token, tokenSecret, profile, done) {
    db.serialize(() => {
        db.get(`SELECT * FROM users WHERE googleId = ?`, [profile.id], (err, row) => {
            if (row) {
                return done(null, row);
            } else {
                db.run(`INSERT INTO users (googleId, name, email) VALUES (?, ?, ?)`, [profile.id, profile.displayName, profile.emails[0].value], function (err) {
                    if (err) return done(err, null);
                    return done(null, { googleId: profile.id, name: profile.displayName });
                });
            }
        });
    });
}));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRouter);
app.use('/api/logs', logRouter);