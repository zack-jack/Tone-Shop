const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// App setup
const app = express();

// Database setup
const db = process.env.MONGO_MLAB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));

// Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/product', require('./routes/product'));

// Server setup
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
