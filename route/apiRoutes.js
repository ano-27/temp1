const { Router } = require('express');

const productController = require('../controller/productController.js');

const router = Router();  // Instance of Router class

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductDetails);

module.exports = router;