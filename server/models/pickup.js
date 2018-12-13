const mongoose = require('mongoose');

const pickupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50
  },
  number: {
    type: Number,
    required: true
  }
});

const Pickup = mongoose.model('Pickup', pickupSchema);

module.exports = { Pickup };
