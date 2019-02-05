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

exports.updateUser = (req, res, next) => {
  const { userId, formData } = req.body;

  // Check if all of the required fields are filled in
  if (
    formData.firstName === '' ||
    formData.lastName === '' ||
    formData.address1 === '' ||
    formData.city === '' ||
    formData.state === '' ||
    formData.zipCode === ''
  ) {
    res.status(422).json({
      message: 'Please fill in all required fields',
      type: 'error'
    });
  } else {
    User.findOneAndUpdate({ _id: userId }, { address: formData })
      .then(() => {
        res.status(200).json({
          message: 'Address updated successfully. Automatically redirecting...',
          type: 'success'
        });
      })
      .catch(err => console.log(err));
  }
};
