var express = require('express');
var router = express.Router();
var destinationCtrl = require('../controllers/destination');

router.post('/flights/:id/destination', destinationCtrl.create);

module.exports = router;