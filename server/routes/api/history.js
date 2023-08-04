const express = require('express');
const router = express.Router();
const historyController = require('../../controllers/historyController');

router.get('/', historyController.getAllHistory)
router.post('/createHistory', historyController.createUserHistory)
router.post('/me', historyController.getUserHistory)

module.exports = router;