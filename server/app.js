const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const keys = require('./config/key')

const handleToken = (accessToken, refreshToken, profile, done) => {
    console.log('Access token', accessToken);
    console.log('Refresh Token', refreshToken);
    console.log('Profile', profile);
}

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, handleToken))



// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://127.0.0.1:27017/emaily_test', { useNewUrlParser: true })

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection Error'));
// db.once('open', () => console.log('Successfully Connected'));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google'))

module.exports = app;