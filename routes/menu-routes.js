const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu-controller');
const { verifyToken } = require('../middlewares/verify-token');
const { verifyAdmin } = require('../middlewares/verify-admin');

router.get('/', menuController.getAllMenu);
router.get('/:id', menuController.getMenu);
router.post('/', verifyToken, verifyAdmin, menuController.createMenu);
router.patch('/:id', menuController.updateMenuItem);
router.delete('/:id', verifyToken, verifyAdmin, menuController.deleteMenuItem);

module.exports = router;