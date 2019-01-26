const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

// Define body type model
const bodyTypeSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    maxLength: 50
  }
});

const BodyType = model('BodyType', bodyTypeSchema);

module.exports = { BodyType };
