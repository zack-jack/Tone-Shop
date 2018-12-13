const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);
// fix for mongoose internal deprecation error
mongoose.set('useCreateIndex', true);

// ====================
//   Mongoose Models
// ====================
const { BodyType } = require('./models/bodyType');
const { Brand } = require('./models/brand');
const { Pickup } = require('./models/pickup');
const { Product } = require('./models/product');
const { User } = require('./models/user');
const { Wood } = require('./models/wood');

// ====================
//   Middleware
// ====================

/* Parsing middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const { admin } = require('./middleware/admin');
const { auth } = require('./middleware/auth');

// ====================
//   Routes
// ====================

// @route   GET /
// @desc    Home route
// @access  Public
app.get('/', (req, res) => res.send('Hello World!'));

// ====================
//   Product Routes
// ====================

// @route   POST /api/product/brand
// @desc    Add new brand
// @access  Private
app.post('/api/product/brand', auth, admin, (req, res) => {
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

// @route   GET /api/product/brands
// @desc    Fetch list of brands
// @access  Public
app.get('/api/product/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(brands);
  });
});

// @route   POST /api/product/body-type
// @desc    Add new body-type
// @access  Private
app.post('/api/product/body-type', auth, admin, (req, res) => {
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

// @route   GET /api/product/body-types
// @desc    Fetch list of body types
// @access  Public
app.get('/api/product/body-types', (req, res) => {
  BodyType.find({}, (err, bodyTypes) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(bodyTypes);
  });
});

// @route   POST /api/product/pickup
// @desc    Add new pickup
// @access  Private
app.post('/api/product/pickup', auth, admin, (req, res) => {
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

// @route   GET /api/product/pickups
// @desc    Fetch list of pickups
// @access  Public
app.get('/api/product/pickups', (req, res) => {
  Pickup.find({}, (err, pickups) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(pickups);
  });
});

// @route   POST /api/product/wood
// @desc    Add new wood
// @access  Private
app.post('/api/product/wood', auth, admin, (req, res) => {
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

// @route   GET /api/product/woods
// @desc    Fetch list of woods
// @access  Public
app.get('/api/product/woods', (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).send(woods);
  });
});

// @route   POST /api/product/item
// @desc    Add new product item
// @access  Private
app.post('/api/product/item', auth, admin, (req, res) => {
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

// @route    GET /api/product/items_by_id
// @desc     Fetch items by id
// @example  /api/product/items_by_id?id=idhere&type=array
// @access   Public
app.get('/api/product/items_by_id', (req, res) => {
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

// @route    GET /api/product/items
// @desc     Fetch items by query string
// @example  /api/product/items?sortBy=sold&order=desc&limit=4
// @example  /api/product/items?sortBy=createdAt&order=desc&limit=4
// @access   Public
app.get('/api/product/items', (req, res) => {
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

// ====================
//   User Routes
// ====================

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return res.status(400).send(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return res.status(400).send(err);
      }
      user.password = hash;
      console.log(user.password);

      user.save((err, doc) => {
        if (err) {
          return res.json({ success: false, err });
        }
        res.status(200).json({
          success: true,
          userData: doc
        });
      });
    });
  });
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
app.post('/api/users/login', (req, res) => {
  // check if user exists - find by email
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return (
        res.json({
          success: false,
          message: 'Login failed. User not found.'
        }),
        res.status(404)
      );
    }

    // check the password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (!isMatch) {
        return (
          res.json({
            success: false,
            message: 'Login failed. Password incorrect.'
          }),
          res.status(403)
        );
      }

      // generate a token
      const token = jwt.sign(user._id.toHexString(), process.env.SECRET_KEY);

      user.token = token;
      user.save((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        res
          .cookie('xAuth', user.token)
          .status(200)
          .json({
            success: true
          });
      });
    });
  });
});

// @route   GET /api/users/auth
// @desc    Auth route
// @access  Private
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.history,
    cart: req.user.cart,
    history: req.user.history
  });
});

// @route   GET /api/users/logout
// @desc    Logs user out
// @access  Private
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id
    },
    { token: '' },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).send({
        success: true
      });
    }
  );
});

app.listen(port, () => console.log(`Express server running on port ${port}`));
