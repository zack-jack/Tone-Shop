const mongoose = require('mongoose');

const bodyTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    maxLength: 50
  }
});

const BodyType = mongoose.model('BodyType', bodyTypeSchema);

module.exports = { BodyType };
