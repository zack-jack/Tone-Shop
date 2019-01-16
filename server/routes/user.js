const express = require('express');
const passport = require('passport');

const auth = require('../controllers/auth');
const passportConfig = require('../config/passport');

const router = express.Router();

// Email + Password provided for login
// Middleware authenticates user before they can access the route
const authenticate = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (info) {
      // Customize default message for empty form fields
      if (info.message === 'Missing credentials') {
        info.message = 'Please fill in all required fields';
      }

      // Send error message
      return res
        .status(200)
        .send(info)
        .end();
    }

    if (user) {
      req.user = user;
      next();
    } else {
      end();
    }
  })(req, res, next);
};

// Register new user
router.post('/register', auth.register);

// Login user
router.post('/login', authenticate, auth.login);

module.exports = router;
