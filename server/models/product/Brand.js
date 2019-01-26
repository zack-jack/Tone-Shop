const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

// Define brand model
const brandSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    maxLength: 50
  }
});

const Brand = model('Brand', brandSchema);

module.exports = Brand;
