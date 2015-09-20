var express = require('express');
var router = express.Router();
var resolve = require('../utility/resolve');
var AccountController = require('../controller/AccountController.js');

/**
 *  如果向http://localhost:3000/account/login发起post请求
 *  请求登录
 */
router.post('/login', function(req, res, next) {
  // 解析req.body，提取username和password
  var data = resolve.selectKey(req.body, 'username password');
  // 如果解析失败，发回前端空数据
  if (data == null) { res.json(null); return; }
  // 查找登录account的username和password是否正确
  AccountController.query(data, function(err, result){
    // 找到用户登录成功返回用户数据，找不到则返回空
    if (result != null)
      res.json(resolve.selectKey(result, '_id token'));
    else
      res.json(null);
  });
});

/**
 *  如果向http://localhost:3000/account/regist发起post请求
 *  请求注册
 */
router.post('/regist', function(req, res, next) {
  // 解析req.body，提取username password email mobile
  var data = resolve.selectKey(req.body, 'username password email mobile');
  // 如果解析失败，发回前端空数据
  if (data == null) { res.json(null); return; }
  // 创建account
  AccountController.createUser(data, function(err, product, numberAffected){
    // 创建没有错误，返回数据
    if (product != null)
      res.json(resolve.selectKey(product, '_id token'));
    else
      res.json(null);
  });
});

/**
 *  如果向http://localhost:3000/account/check发起post请求
 *  请求查询
 */
router.post('/check', function(req, res, next) {
  // 解析req.body，提取username password email mobile
  var data = resolve.selectKey(req.body, 'username');
  // 如果解析失败，发回前端空数据
  if (data == null) { res.json(null); return; }
  AccountController.query(data, function(err, result){
    if(result != null)
      res.json(true);
    else
      res.json(null);
  });
});

/**
 *  如果向http://localhost:3000/account/update发起post请求
 *  请求查询
 */
router.post('/update', function(req, res, next) {
  resolve.parseAjax(req, 'json', function(data){
    // 解析req.body，提取executor的_id token
    var executor = resolve.selectKey(data, 'executor');
    // 解析req.body，提取update数据
    var update = resolve.selectKey(data, 'update');
    // 如果解析失败，发回前端空数据
    if (executor == null || update == null) { res.json(null); return; }
    // 验证身份，然后更新account基本信息
    AccountController.update(executor, update, function(err, result){
      if(result != null){
        res.json(result);
      }
      else
        res.json(null);
    });
  });
});

module.exports = router;
