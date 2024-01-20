const express = require('express');
const router = express.Router();
const { getProducts, getProduct, postProduct } = require('./controller');

router.route('/products').get(getProducts);
router.route('/products/:pid').get(getProduct);

router.route('/products').post(postProduct);

module.exports = router;
