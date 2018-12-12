const admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.status(403).json({
      success: false,
      message: 'Must have admin privelages to submit this request.'
    });
  }

  next();
};

module.exports = { admin };
