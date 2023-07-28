const express = require('express');
const router = express.Router();
const mockController = require('../../controllers/mockController.js');

router.get('/', mockController.handleMock);

module.exports = router;