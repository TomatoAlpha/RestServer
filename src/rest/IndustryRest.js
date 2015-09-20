var express = require('express');
var router = express.Router();
var resolve = require('../utility/resolve');
var IndustryController = require('../controller/IndustryController');

/**
 *  如果向http://localhost:3000/account/login发起post请求
 *  请求登录
 */
router.post('/', function(req, res, next) {
});


module.exports = router;
