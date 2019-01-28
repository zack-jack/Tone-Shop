const jwt = require('jsonwebtoken');

const User = require('../models/user/User');
const key = require('../config/keys');

exports.getCurrentUser = (req, res, next) => {
  const token = req.headers.authorization;

  // Get user id from the request auth token
  const decoded = jwt.verify(token, key.tokenSecret);
  const userId = decoded.sub;

  // Find user in database that matches the request user id
  User.findOne({ _id: userId })
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => console.log(err));
};
