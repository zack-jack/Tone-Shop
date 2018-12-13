const express = require('express');

const { admin } = require('../../../middleware/admin');
const { auth } = require('../../../middleware/auth');

const { BodyType } = require('../../../models/bodyType');
const { Brand } = require('../../../models/brand');
const { Pickup } = require('../../../models/pickup');
const { Product } = require('../../../models/product');
const { Wood } = require('../../../models/wood');

const router = express.Router();

// ====================
//   Add New Brand
// ====================

// @route   POST /api/product/brand
// @desc    Add new brand
// @access  Private
router.post('/brand', auth, admin, (req, res) => {
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({
      success: true,
      brand: doc
    });
  });
});

// ====================
//   Add Body Type
// ====================

// @route   POST /api/product/body-type
// @desc    Add new body-type
// @access  Private
router.post('/body-type', auth, admin, (req, res) => {
  const bodyType = new BodyType(req.body);

  bodyType.save((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({
      success: true,
      bodyType: doc
    });
  });
});

// ====================
//   Add Pickup Config
// ====================

// @route   POST /api/product/pickup
// @desc    Add new pickup
// @access  Private
router.post('/pickup', auth, admin, (req, res) => {
  const pickup = new Pickup(req.body);

  pickup.save((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({
      success: true,
      pickup: doc
    });
  });
});

// ====================
//   Add Wood Config
// ====================

// @route   POST /api/product/wood
// @desc    Add new wood
// @access  Private
router.post('/wood', auth, admin, (req, res) => {
  const wood = new Wood(req.body);

  wood.save((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({
      success: true,
      wood: doc
    });
  });
});

// ====================
//   Add New Item
// ====================

// @route   POST /api/product/item
// @desc    Add new product item
// @access  Private
router.post('/item', auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({
      success: true,
      item: doc
    });
  });
});

// ====================
//   Fetch Brands
// ====================

// @route   GET /api/product/brands
// @desc    Fetch list of brands
// @access  Public
router.get('/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(brands);
  });
});

// ====================
//   Fetch Body Types
// ====================

// @route   GET /api/product/body-types
// @desc    Fetch list of body types
// @access  Public
router.get('/body-types', (req, res) => {
  BodyType.find({}, (err, bodyTypes) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(bodyTypes);
  });
});

// ====================
//   Fetch Pickup Configs
// ====================

// @route   GET /api/product/pickups
// @desc    Fetch list of pickups
// @access  Public
router.get('/pickups', (req, res) => {
  Pickup.find({}, (err, pickups) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(pickups);
  });
});

// ====================
//   Fetch Woods
// ====================

// @route   GET /api/product/woods
// @desc    Fetch list of woods
// @access  Public
router.get('/woods', (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(woods);
  });
});

// ====================
//   Fetch Items by id
// ====================

// @route    GET /api/product/items_by_id
// @desc     Fetch items by id
// @example  /api/product/items_by_id?id=idhere&type=array
// @access   Public
router.get('/items_by_id', (req, res) => {
  const type = req.query.type;

  if (type === 'array') {
    const ids = req.query.id.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({
    _id: { $in: items }
  })
    .populate('brand type wood pickup')
    .exec((err, docs) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.status(200).send(docs);
    });
});

// ====================
//   Fetch Items by Query String
// ====================

// @route    GET /api/product/items
// @desc     Fetch items by query string
// @example  /api/product/items?sortBy=sold&order=desc&limit=4
// @example  /api/product/items?sortBy=createdAt&order=desc&limit=4
// @access   Public
router.get('/items', (req, res) => {
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  const order = req.query.order ? req.query.order : 'asc';
  const limit = req.query.limit ? parseInt(req.query.limit) : 8;

  Product.find()
    .populate('brand type wood pickup')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, items) => {
      if (err) {
        return res.status(400).send(err);
      }

      res.status(200).send(items);
    });
});

module.exports = router;
