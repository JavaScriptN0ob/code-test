const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.get('/test', productController.testController);

module.exports = router;