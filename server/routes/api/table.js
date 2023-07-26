const express = require('express');
const router = express.Router();
const tableController = require('../../controllers/tableController');

router.get('/getAllTables', tableController.getAllTables);
router.post('/addTable', tableController.addTable)
router.post('/updateTable', tableController.updateColumnForGivenTable)
router.post('/deleteTable', tableController.deleteTable)

module.exports = router;