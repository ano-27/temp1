const { Router } = require('express');
const viewController = require('./../controller/viewController.js');

const router = new Router();

router.get('/products', viewController.productController);
router.get('/products/:id', viewController.getProductDetails);

module.exports = router;