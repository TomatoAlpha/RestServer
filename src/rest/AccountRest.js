var express = require('express');
var router = express.Router();
var resolve = require('../utility/resolve');
var AccountController = require('../controller/AccountController.js');
var ObjectSet = require('../utility/objectSet').ObjectSet;
/**
 *  如果向http://localhost:3000/account/login发起post请求
 *  请求登录
 */
router.post('/login', function(req, res, next) {

  try {
    // 解析req.body，提取username和password
    var data = new ObjectSet(req.body).selectKey('username password').data;
    if (!data) throw 'Usrename and password resolve failed.';  // 如果解析失败，报错

    AccountController.query(data, function(err, result){  // 查找登录account的username和password是否正确
      if (result) {
        var resData = new ObjectSet(result).selectKey('_id token').modifyKey('uid token').data;
        res.json(resData); // 找到用户登录成功返回用户数据，返回uid和token
      } else {
        if (!err) {
          // throw 'Usrename and password is not correct.';  // 用户验证失败，报错
          res.json({ 'err': 'Usrename and password is not correct.'});  // 用户验证失败，报错
        } else {
          // throw err.toString(); // 查询失败，内部错误
          res.json({ 'err': err.toString()});  // 用户验证失败，报错
        }
      }
    });
  } catch (e) {
    res.json({ 'err': 'User login failed, detial:' + e });
  }
});

/**
 *  如果向http://localhost:3000/account/regist发起post请求
 *  请求注册
 */
router.post('/regist', function(req, res, next) {
  // 解析req.body，提取username password email mobile
  var data = new ObjectSet(req.body).selectKey('username password email mobile').data;
  // 如果解析失败，发回前端空数据
  if (data == null) { res.json(null); return; }
  // 创建account
  AccountController.createUser(data, function(err, product, numberAffected){
    // 创建没有错误，返回数据
    if (product != null) {
      var resData = new ObjectSet(product).selectKey('_id token').modifyKey('uid token').data;
      res.json(resData);
    }
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

/**
 *  如果向http://localhost:3000/account/update发起post请求
 *  请求查询
 */
router.post('/info', function(req, res, next) {
  resolve.parseAjax(req, 'json', function(data){
    // 解析req.body，提取executor的_id token
    var ticket = new ObjectSet(data).selectKey('uid token').modifyKey('_id token').data;
    // 如果解析失败，发回前端空数据
    if (!ticket) { res.json(null); return; }
    // 验证身份，然后更新account基本信息
    AccountController.query(ticket, function(err, result){
      if(result != null){
        res.json(result);
      } else {
        res.json(null);
      }
    });
  });
});

module.exports = router;
