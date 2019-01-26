const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

// Define product model
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: 1,
      maxLength: 50
    },
    color: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true
    },
    shipping: {
      type: Boolean,
      required: true
    },
    available: {
      type: Boolean,
      required: true
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'BodyType',
      required: true
    },
    wood: {
      type: Schema.Types.ObjectId,
      ref: 'Wood',
      required: true
    },
    pickup: {
      type: Schema.Types.ObjectId,
      ref: 'Pickup',
      required: true
    },
    frets: {
      type: Number,
      required: true
    },
    sold: {
      type: Number,
      default: 0
    },
    publish: {
      type: Boolean,
      required: true
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Product = model('Product', productSchema);

module.exports = { Product };
