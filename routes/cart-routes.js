const express = require('express');
const router = express.Router();
const cartController = require('../controllers/carts-controller');

router.get('/', cartController.getCarts);
router.post('/', cartController.addToCart);
router.delete('/:id', cartController.deleteCart);

module.exports = router;