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

/**
 *  如果向http://localhost:3000/account/login发起post请求
 *  请求登录
 */
router.post('/view/:pid', function(req, res, next) {
  PaperController.view(req, function(err, result){
    res.json(result);
  });
});

/**
 *  如果向http://localhost:3000/account/login发起post请求
 *  请求登录
 */
router.post('/list', function(req, res, next) {
  PaperController.list(req, function(err, result){
    res.json(result);
  });
});

/**
 *  如果向http://localhost:3000/account/login发起post请求
 *  请求登录
 */
router.get('/:pid', function(req, res, next) {
  PaperController.getPaperContent(req, function(err, result){
    res.json(result);
  });
});

/**
 *  如果向http://localhost:3000/account/login发起post请求
 *  请求登录
 */
router.post('/', function(req, res, next) {
  PaperController.doPaper(req, function(err, result){
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
