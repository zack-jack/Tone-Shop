const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.cookies.xAuth;

  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      return res.status(400).send(err);
    }
    User.findOne({ _id: decode, token: token }, (err, user) => {
      if (err) {
        return res
          .status(403)
          .send(err)
          .json({
            message: 'You must be logged in first.'
          });
      }

      if (!user) {
        return res.json({
          isAuth: false,
          error: true
        });
      }

      req.token = token;
      req.user = user;
      next();
    });
  });
};

module.exports = { auth };
