const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/product', productController.getProductById);

router.get('/products/categories', productController.getCategories);
router.get('/products/category/:category', productController.getProductsFromCategory);

router.post('/enquiry', productController.enquireProduct);

module.exports = router;