const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

// Define pickup model
const pickupSchema = Schema({
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

const Pickup = model('Pickup', pickupSchema);

module.exports = { Pickup };
