module.exports = (req, res, next) => {
  if (req.user && !req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: 'You do not have admin privileges' });
  }

  next();
};
