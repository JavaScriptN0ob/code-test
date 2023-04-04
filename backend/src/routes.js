const express = require('express');
const productRoute = require('./routes/productRoute');

const router = express.Router();

router.use('', productRoute);

module.exports = router;