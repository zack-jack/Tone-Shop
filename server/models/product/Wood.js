const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

// Define wood model
const woodSchema = Schema({
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

const Wood = model('Wood', woodSchema);

module.exports = Wood;
