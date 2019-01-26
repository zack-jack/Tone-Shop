const Body = require('../models/product/Body');
const Brand = require('../models/product/Brand');
const Pickup = require('../models/product/Pickup');
const Product = require('../models/product/product');
const Wood = require('../models/product/Wood');

// Add new body type route handling
exports.addBodyType = (req, res, next) => {
  const body = new Body(req.body);

  // Save the new body type to the database
  body.save((err, body) => {
    if (err) {
      return res
        .status(422)
        .json({ success: false, message: 'Error saving new body type', err });
    }

    res.status(200).json({ success: true, body });
  });
};

// Fetch all existing body types from the database
exports.fetchAllBodyTypes = (req, res, next) => {
  // Search database for body types and get everything
  Body.find({}, (err, bodies) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error fetching body types from database',
        err
      });
    }

    res.status(200).json({ success: true, bodies });
  });
};

// Add new brand route handling
exports.addBrand = (req, res, next) => {
  const brand = new Brand(req.body);

  // Save the new brand to the database
  brand.save((err, brand) => {
    if (err) {
      return res
        .status(422)
        .json({ success: false, message: 'Error saving new brand', err });
    }

    res.status(200).json({ success: true, brand });
  });
};

// Fetch all existing brands from the database
exports.fetchAllBrands = (req, res, next) => {
  // Search database for brands and get everything
  Brand.find({}, (err, brands) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error fetching brands from database',
        err
      });
    }

    res.status(200).json({ success: true, brands });
  });
};

// Add new pickup type route handling
exports.addPickupType = (req, res, next) => {
  const pickup = new Pickup(req.body);

  // Save the new pickup to the database
  pickup.save((err, pickup) => {
    if (err) {
      return res
        .status(422)
        .json({ success: false, message: 'Error saving new pickup', err });
    }

    res.status(200).json({ success: true, pickup });
  });
};

// Fetch all existing pickup types from the database
exports.fetchAllPickupTypes = (req, res, next) => {
  // Search database for pickup types and get everything
  Pickup.find({}, (err, pickups) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error fetching pickup types from database',
        err
      });
    }

    res.status(200).json({ success: true, pickups });
  });
};

// Add new product route handling
exports.addProduct = (req, res, next) => {
  const product = new Product(req.body);

  // Save the new product to the database
  product.save((err, product) => {
    if (err) {
      return res
        .status(422)
        .json({ success: false, message: 'Error saving new product', err });
    }

    res.status(200).json({ success: true, product });
  });
};

// Fetch all existing products from the database
exports.fetchAllProducts = (req, res, next) => {
  // Search database for products and get everything
  Product.find({}, (err, products) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error fetching products from database',
        err
      });
    }

    res.status(200).json({ success: true, products });
  });
};

// Add new wood type route handling
exports.addWoodType = (req, res, next) => {
  const wood = new Wood(req.body);

  // Save the new wood type to the database
  wood.save((err, wood) => {
    if (err) {
      return res
        .status(422)
        .json({ success: false, message: 'Error saving new wood type', err });
    }

    res.status(200).json({ success: true, wood });
  });
};

// Fetch all existing wood types from the database
exports.fetchAllWoodTypes = (req, res, next) => {
  // Search database for wood types and get everything
  Wood.find({}, (err, woods) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error fetching wood types from database',
        err
      });
    }

    res.status(200).json({ success: true, woods });
  });
};
