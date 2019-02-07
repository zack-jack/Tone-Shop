const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user/User');

require('dotenv').config();

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  if (!email || !password) {
    return done(null, false, { message: 'Please fill in all required fields' });
  } else {
    // Check DB for user that matches provided email
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);

      // If no user found, return false
      if (!user) {
        return done(null, false, { message: 'Email not found' });
      }

      // Compare password provided with matched user's password
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);

        // Password does not match, return false
        if (!isMatch) {
          return done(null, false, { message: 'Password incorrect' });
        }

        // Password matches, return user
        return done(null, user);
      });
    });
  }
});

// Set up options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.TOKEN_SECRET
};

// Create JWT strategy for login
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // Check if the payload user id exists in DB
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);

    // If user exists, call done with user obj
    // Otherwise, call done without user obj
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
