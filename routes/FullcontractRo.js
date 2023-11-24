//route
const express = require('express');
const router = express.Router();
const fullcontractController = require('../controllers/FullcontractController');

router.post('/add', fullcontractController.addFullcontract);
router.get('/getall', fullcontractController.getFullcontract);
router.get('/getdetail/:id', fullcontractController.getFullContractById);


module.exports = router;