const express = require('express');
const router = express.Router();
const PropertController = require('../controllers/PropertyController');

router.get('/getall', PropertController.getAllProperty);

module.exports = router;