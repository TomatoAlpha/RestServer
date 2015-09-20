var fs = require('fs');
var formidable = require('formidable');
var PaperModel = require('./models/models').paper;
var QuestionModel = require('./models/models').question;
var config = require('../../config');
var resolve = require('../utility/resolve');
var tracer = require('../utility/tracer');
var Controller = require('./controller');

/**
 *  如果向http://localhost:3000/paper/create发起创建问卷请求
 *  请求登录
 */
exports.create = function (req, callback) {
  var paperData = null, err;
  try {
    // 创建formidable中间件实例
    var form = new formidable.IncomingForm();
    // 配置formidable
    form.uploadDir = config.ServerCache;
    form.keepExtensions = true;
    // formidable解析request
    form.parse(req, function(err, fields, files){
      // 自定义查询adapter，用于查询orgnization和account同时匹配结果
      var adapter = new Controller.Adaper('orgnization account');
      // 将uid和token转成_id和token
      adapter['account'] = resolve.modifyKey(resolve.selectKey(fields, 'uid token'), '_id token');
      adapter['orgnization'] = resolve.modifyKey(resolve.selectKey(fields, 'oid'), '_id');
      // 利用adaper来验证account和orgnization
      adapter.query(function(err, result){
        if(result) {
          // 解压并且解析收到的压缩包
          resolve.paperUnpackageAndParse(files.file.path, config.PicServer, function(paperData){
            // 完成问卷解压和解析后删除文件
            fs.unlink(files.file.path);
            // 回调返回问卷数据
            callback(null, paperData);
          });
        } else {
          // 如果验证adaper验证出错，删除问卷数据
          fs.unlink(files.file.path);
        }
      });
    });
  } catch (e) {
    err = e;
    tracer.error('Create paper error, detial:' + err);
    callback(err, paperData);
  }
}
