const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec()
        .then(user => {
            if (user){
                // if found, set this user as req.user
                return done(null, user);
            } else {
                // if not found, create the user and set it as req.user
                return User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }).then(newUser => {
                    return done(null, newUser);
                });
            }
        })
        .catch(err => {
            console.log('Error in Google Strategy-passport', err);
            return done(err);
        });
    }
));

module.exports = passport;
