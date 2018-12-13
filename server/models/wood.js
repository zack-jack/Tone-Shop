const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
    maxLength: 50
  },
  neck: {
    type: String,
    required: true,
    maxLength: 50
  },
  fretboard: {
    type: String,
    required: true,
    maxLength: 50
  }
});

const Wood = mongoose.model('Wood', woodSchema);

module.exports = { Wood };
