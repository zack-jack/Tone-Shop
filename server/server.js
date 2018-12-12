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
const { BodyType } = require('./models/bodyType');
const { Brand } = require('./models/brand');
const { User } = require('./models/user');

// ====================
//   Middleware
// ====================

/* Parsing middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const { admin } = require('./middleware/admin');
const { auth } = require('./middleware/auth');

// ====================
//   Routes
// ====================

// @route   GET /
// @desc    Home route
// @access  Public
app.get('/', (req, res) => res.send('Hello World!'));

// @route   POST /api/product/brand
// @desc    Add new brand
// @access  Private
app.post('/api/product/brand', auth, admin, (req, res) => {
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({
      success: true,
      brand: doc
    });
  });
});

// @route   GET /api/product/brands
// @desc    Fetch list of brands
// @access  Public
app.get('/api/product/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(brands);
  });
});

// @route   POST /api/product/body-type
// @desc    Add new body-type
// @access  Private
app.post('/api/product/body-type', auth, admin, (req, res) => {
  const bodyType = new BodyType(req.body);

  bodyType.save((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({
      success: true,
      bodyType: doc
    });
  });
});

// @route   GET /api/product/body-types
// @desc    Fetch list of body types
// @access  Public
app.get('/api/product/body-types', (req, res) => {
  BodyType.find({}, (err, bodyTypes) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(bodyTypes);
  });
});

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
      return res.status(400).send(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return res.status(400).send(err);
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
          success: false,
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
            success: false,
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
            success: true
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

// @route   GET /api/users/logout
// @desc    Logs user out
// @access  Private
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id
    },
    { token: '' },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).send({
        success: true
      });
    }
  );
});

app.listen(port, () => console.log(`Express server running on port ${port}`));
