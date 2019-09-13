const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/key')

const User = mongoose.model('users');

const handleToken = (accessToken, refreshToken, profile, done) => {
    new User({ googleId: profile.id }).save()
}

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, handleToken))
