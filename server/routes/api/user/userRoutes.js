const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { auth } = require('../../../middleware/auth');

const { User } = require('../../../models/user');

const router = express.Router();

// ====================
//   Register
// ====================

// @route   POST /api/user/register
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
  const user = new User(req.body);
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return res.status(400).send(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return res.status(400).send(err);
      }
      user.password = hash;

      user.save((err, doc) => {
        if (err) {
          return res.status(400).json({ registerSuccess: false, err });
        }
        res.status(200).json({
          registerSuccess: true,
          userData: doc
        });
      });
    });
  });
});

// ====================
//   Login
// ====================

// @route   POST /api/user/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  // check if user exists - find by email
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return (
        res.json({
          loginSuccess: false,
          message: 'Login failed. User not found.'
        }),
        res.status(404)
      );
    }

    // check the password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (!isMatch) {
        return (
          res.json({
            loginSuccess: false,
            message: 'Login failed. Password incorrect.'
          }),
          res.status(403)
        );
      }

      // generate a token
      const token = jwt.sign(user._id.toHexString(), process.env.SECRET_KEY);

      user.token = token;
      user.save((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        res
          .cookie('xAuth', user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

// ====================
//   Logout
// ====================

// @route   GET /api/user/logout
// @desc    Logs user out
// @access  Private
router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id
    },
    { token: '' },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ logoutSuccess: false, err });
      }
      return res.status(200).send({
        logoutSuccess: true
      });
    }
  );
});

// ====================
//   Auth
// ====================

// @route   GET /api/user/auth
// @desc    Auth route
// @access  Private
router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.history,
    cart: req.user.cart,
    history: req.user.history
  });
});

module.exports = router;
