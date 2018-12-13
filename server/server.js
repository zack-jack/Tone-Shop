const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// ====================
//   Mongoose
// ====================
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);
// fix for mongoose internal deprecation error
mongoose.set('useCreateIndex', true);

// ====================
//   Middleware
// ====================

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

const user = require('./routes/api/user/userRoutes');
const product = require('./routes/api/product/productRoutes');

app.use('/api/user', user);
app.use('/api/product', product);

// ====================
//   Server listen
// ====================

app.listen(port, () => console.log(`Express server running on port ${port}`));
