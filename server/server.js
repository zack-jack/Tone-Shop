const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE);

/* Mongoose Models */
const { User } = require('./models/user');

/* Routes */
app.get('/', (req, res) => res.send('Hello World!'));

/* User Routes */
app.post('/api/users/register', (req, res) => {
  res.status(200);
});

app.listen(port, () => console.log(`Express server running on port ${port}`));
