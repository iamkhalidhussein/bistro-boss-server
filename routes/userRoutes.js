const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const { verifyToken } = require('../middlewares/verify-token');
const { verifyAdmin } = require('../middlewares/verify-admin');

router.get('/', verifyToken, verifyAdmin, userController.getUsers);
router.get('/admin/:email', verifyToken, userController.getAdminStatus);
router.post('/', userController.saveUser);
router.patch('/admin/:id', verifyToken, verifyAdmin, userController.makeAdmin);
router.delete('/admin/:id', verifyToken, verifyAdmin, userController.deleteUser);

module.exports = router;