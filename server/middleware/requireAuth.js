const passport = require('passport');

const passportConfig = require('../config/passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false });

  next();
};
