const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');

router.get('/order-stats', orderController.getOrderStats);

module.exports = router;