const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/getAllUsers', userController.getAllUsers);
router.post('/updateUserRole', userController.updateUserRoleByUsername);
router.post('/deleteUser', userController.deleteUser);

module.exports = router;