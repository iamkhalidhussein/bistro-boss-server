const express = require('express');
const router = express.Router();
const jwtController = require('../controllers/jwt-controller');

router.post('/', jwtController.getJwtToken);

module.exports = router;