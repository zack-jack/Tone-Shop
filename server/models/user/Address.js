const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

// Define user address model
const addressSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  }
});

// Model class
const Address = model('Address', addressSchema);

module.exports = Address;
