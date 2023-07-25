const express = require('express');
const router = express.Router();
const resourceController = require('../../controllers/resourceController');

router.get('/', resourceController.handleResources);

module.exports = router;