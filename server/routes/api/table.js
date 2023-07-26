const express = require('express');
const router = express.Router();
const tableController = require('../../controllers/tableController');

router.get('/getAllTables', tableController.getAllTables);
router.post('/addTable', tableController.addTable)

module.exports = router;