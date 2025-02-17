const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');
const { verifyToken } = require('../middlewares/verify-token');

router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.get('/:email', verifyToken, paymentController.getPaymentsByEmail);
router.post('/', paymentController.processPayment);

module.exports = router;