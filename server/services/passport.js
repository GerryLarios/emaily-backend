const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/key')
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user))
});

const handleToken = (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        .then(existing => {
            if (existing)
                done(null, existing)
            else
                new User({ googleId: profile.id }).save()
                    .then(user => done(null, user))
        })
}

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, handleToken))
