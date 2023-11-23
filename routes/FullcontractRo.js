//route
const express = require('express');
const router = express.Router();
const fullcontractController = require('../controllers/FullcontractController');

router.post('/add', fullcontractController.addFullcontract);
router.get('/getall', fullcontractController.getFullcontract);

router.get('/getall', (req, res) => {
  fullcontractController.getFullcontract((err, data) => {
    if (err) {
      // handle error
    } else {
      console.log(data);
      res.render('../views/components/fullContract/index.ejs', { contracts: data });
    }
  });
});

module.exports = router;