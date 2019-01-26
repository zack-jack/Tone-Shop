const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

// Define body type model
const bodySchema = Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    maxLength: 50
  }
});

const Body = model('Body', bodySchema);

module.exports = Body;
