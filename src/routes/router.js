var express = require('express');
var router = express.Router();

// 主路由：控制所有路由的进出
router.all('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  next();
});

/**
 *  分路由：处理所有分路径的业务
 **/
router.use('/account', require('../rest/AccountRest'));
router.use('/industry', require('../rest/IndustryRest'));
router.use('/orgnization', require('../rest/OrgnizationRest'));
router.use('/paper', require('../rest/PaperRest'));
router.use('/client', require('../rest/ClientRest'));

module.exports = router;
