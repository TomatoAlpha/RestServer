var express = require('express');
var router = express.Router();
var tracer = require('../utility/tracer');

// 定义localhost:3000主页
router.all('*', function(req, res, next) {
  var ip = req.connection.remoteAddress.split(':')[2];
  if(ip != '1') {
    tracer.info('Ip:' + ip + ', method:' + req.method + ', url:' + req.url);
    res.end(null);
  }
  else {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    next();
  }
});

/**
 *  定义
 **/
router.use('/account', require('../rest/AccountRest'));
router.use('/industry', require('../rest/IndustryRest'));
router.use('/orgnization', require('../rest/OrgnizationRest'));
router.use('/paper', require('../rest/PaperRest'));
router.use('/client', require('../rest/ClientRest'));

module.exports = router;
