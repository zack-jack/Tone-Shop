const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

// Define order model
const orderSchema = new Schema({
  orderNumber: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  addresses: {
    type: Object,
    required: true
  },
  payment: {
    type: Object,
    required: true
  },
  cart: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  fulfillmentStatus: {
    type: String,
    default: 'In progress'
  }
});

// Model class
const Order = model('Order', orderSchema);

module.exports = Order;
