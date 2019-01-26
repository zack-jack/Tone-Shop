const express = require('express');

// Controllers
const product = require('../controllers/product');

// Middleware
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

// Add new body type to products
router.post('/body', requireAuth, requireAdmin, product.addBodyType);

// Get all body types from database
router.get('/bodies', product.fetchAllBodyTypes);

// Add new brand to products
router.post('/brand', requireAuth, requireAdmin, product.addBrand);

// Get all brands from database
router.get('/brands', product.fetchAllBrands);

// Add new pickup type to products
router.post('/pickup', requireAuth, requireAdmin, product.addPickupType);

// Get all pickup types from database
router.get('/pickups', product.fetchAllPickupTypes);

// Add new product to products
router.post('/item', requireAuth, requireAdmin, product.addProduct);

// Get all products from database
router.get('/items', product.fetchAllProducts);

// Add new wood type to products
router.post('/wood', requireAuth, requireAdmin, product.addWoodType);

// Get all wood types from database
router.get('/woods', product.fetchAllWoodTypes);

module.exports = router;
