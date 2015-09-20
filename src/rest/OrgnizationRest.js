var express = require('express');
var router = express.Router();
var resolve = require('../utility/resolve');
var OrgnizationController = require('../controller/OrgnizationController');

router.post('/create', function(req, res, next) {
  var data = resolve.selectKey(req.body, 'name');
});

router.post('/query', function(req, res, next) {
  var data = resolve.selectKey(req.body, 'name');
});

module.exports = router;
