const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/products/categories', productController.getCategories);

module.exports = router;