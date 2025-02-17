const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');

router.get('/order-stats', adminController.getAdminStats);

module.exports = router;