const express = require('express');
const router = express.Router();
const validationController = require('../../controllers/validationsController');

router.get('/getValidations', validationController.getValidations);
router.post('/updateValidations', validationController.updateValidations);

module.exports = router;