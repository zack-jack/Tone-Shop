const express = require('express');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

// Welcome
router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

module.exports = router;
