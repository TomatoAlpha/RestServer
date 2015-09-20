var express = require('express');
var router = express.Router();
var resolve = require('../utility/resolve');
var AccountController = require('../controller/AccountController.js');
var PaperController = require('../controller/PaperController');

/**
 *  如果向http://localhost:3000/account/login发起post请求
 *  请求登录
 */
router.post('/create', function(req, res, next) {
  PaperController.create(req, function(err, paper){
    res.json(paper);
  });
});


module.exports = router;
