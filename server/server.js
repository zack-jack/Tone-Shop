const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);
// fix for mongoose internal deprecation error
mongoose.set('useCreateIndex', true);

// ====================
//   Mongoose Models
// ====================
const { User } = require('./models/user');

// ====================
//   Middleware
// ====================

/* Parsing middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const { auth } = require('./middleware/auth');

// ====================
//   Routes
// ====================

// @route   GET /
// @desc    Home route
// @access  Public
app.get('/', (req, res) => res.send('Hello World!'));

// ====================
//   User Routes
// ====================

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return res.status(500).send(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return res.status(500).send(err);
      }
      user.password = hash;
      console.log(user.password);

      user.save((err, doc) => {
        if (err) {
          return res.json({ success: false, err });
        }
        res.status(200).json({
          success: true,
          userData: doc
        });
      });
    });
  });
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
app.post('/api/users/login', (req, res) => {
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

// @route   GET /api/users/auth
// @desc    Auth route
// @access  Private
app.get('/api/users/auth', auth, (req, res) => {
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

app.listen(port, () => console.log(`Express server running on port ${port}`));
