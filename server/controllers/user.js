const jwt = require('jsonwebtoken');

const User = require('../models/user/User');
const Order = require('../models/order/Order');
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

exports.updateUserAddress = (req, res, next) => {
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

exports.addOrderToHistory = (req, res, next) => {
  const { orderNumber, user, addresses, payment, cart, total } = req.body;

  // Create new order instance
  const newOrder = new Order({
    orderNumber,
    user,
    addresses,
    payment,
    cart,
    total
  });

  // Save new order record to DB
  newOrder
    .save()
    .then(order => {
      // Check if user object is not empty
      if (Object.entries(user).length !== 0 && user.constructor === Object) {
        // Update user order history
        User.findOneAndUpdate(
          { _id: user._id },
          { $push: { orderHistory: order } }
        )
          .then(() => {})
          .catch(err => console.log(err));
      }

      // Respond that the order was created
      res.status(200).json({ message: 'Thanks for placing your order!' });
    })
    .catch(err => console.log(err));
};

exports.getUserOrderHistory = (req, res, next) => {
  const token = req.headers.authorization;

  // Get user id from the request auth token
  const decoded = jwt.verify(token, key.tokenSecret);
  const userId = decoded.sub;

  // Find user in database that matches the request user id
  // Then get the user's order history
  User.findOne({ _id: userId })
    .then(user => res.status(200).json(user.orderHistory))
    .catch(err => console.log(err));
};
