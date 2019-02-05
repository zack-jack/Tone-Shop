const express = require('express');
const passport = require('passport');

const auth = require('../controllers/auth');
const user = require('../controllers/user');
const passportConfig = require('../config/passport');

const router = express.Router();

// Email + Password provided for login
// Middleware authenticates user before they can access the route
const authenticate = (req, res, next) => {
  // Check that the form fields from req are not empty
  if (!req.body.email || !req.body.password) {
    // Send error message
    return res
      .status(200)
      .json({ message: 'Please fill in all required fields' })
      .end();
  } else {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (info) {
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
  }
};

// Register new user
router.post('/register', auth.register);

// Login user
router.post('/login', authenticate, auth.login);

// Get currently authenticated user's data
router.get('/current', user.getCurrentUser);

// Update current user
router.post('/update', user.updateUser);

module.exports = router;
