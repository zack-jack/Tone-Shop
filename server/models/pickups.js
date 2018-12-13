const mongoose = require('mongoose');

const pickupsSchema = mongoose.Schema({
  style: {
    type: String,
    required: true,
    maxLength: 50
  },
  number: {
    type: Number,
    required: true
  }
});

const Pickups = mongoose.model('Pickups', pickupsSchema);

module.exports = { Pickups };
