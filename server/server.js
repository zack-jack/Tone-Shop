const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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

// @route   POST /
// @desc    Register new user
// @access  Public
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
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

app.listen(port, () => console.log(`Express server running on port ${port}`));
