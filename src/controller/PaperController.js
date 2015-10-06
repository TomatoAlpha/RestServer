var fs = require('fs');
var formidable = require('formidable');
var PaperModel = require('./models/models').paper;
var QuestionModel = require('./models/models').question;
var ResultModel = require('./models/models').result;
var config = require('../../config');
var resolve = require('../utility/resolve');
var tracer = require('../utility/tracer');
var Controller = require('./controller');
var ObjectSet = require('../utility/objectSet').ObjectSet;

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
      adapter['account'] = new ObjectSet(fields).selectKey('uid token').modifyKey('_id token').data;
      adapter['orgnization'] = new ObjectSet(fields).selectKey('oid').modifyKey('_id').data;
      // 利用adaper来验证account和orgnization
      adapter.query(function(err, result){
        if(result) {
          // 解压并且解析收到的压缩包
          resolve.paperUnpackageAndParse(files.file.path, config.PicServer, function(paperData){
            // 完成问卷解压和解析后删除文件
            fs.unlink(files.file.path);
            // 保存数据
            paperData.data['uid'] = adapter['account']['_id'];
            paperData.data['oid'] = adapter['orgnization']['_id'];
            paperData.data['createTime'] = new Date();
            var question = paperData.data['question'];
            paperData.data['question'] = [];
            for (var i = 0; i < question.length; i++) {
              var questions = new QuestionModel(question[i]);
              questions.save(function(err, questionResult, numberAffected){
                paperData.data['question'].push(questionResult['_id']);
                if (paperData.data['question'].length == question.length - 1) {
                  var paper = new PaperModel(paperData.data);
                  paper.save(function(err, paperResult, numberAffected){
                    callback(null, paperResult);
                  });
                }
              });
            }
          });
        } else {
          // 如果验证adaper验证出错，删除问卷数据
          fs.unlink(files.file.path);
          callback('Create paper error, detial:' + err, null);
        }
      });
    });
  } catch (e) {
    err = e;
    tracer.error('Create paper error, detial:' + err);
    callback(err, paperData);
  }
}

/**
 *  如果向http://localhost:3000/paper/question/{token}发起创建问卷请求
 *  请求登录
 */
 exports.view = function (req, callback) {
   var err, self = this;
   try {
     resolve.parseAjax(req, 'json', function(data){
       // 自定义查询adapter，用于查询orgnization和account同时匹配结果
       var adapter = new Controller.Adaper('orgnization account');
       // 将uid和token转成_id和token
       adapter['account'] = new ObjectSet(data).selectKey('uid token').modifyKey('_id token').data;
       adapter['orgnization'] = new ObjectSet(data).selectKey('oid').modifyKey('_id').data;
       // 利用adaper来验证account和orgnization
       adapter.query(function(err, result){
         if(result) {
           self.query({uid:data['uid'], oid:data['oid'], _id: req.params.pid}, function(err, result){
             if (result) {
               var questionList = [];
               for (var i = 0; i < result['question'].length; i++) {
                 QuestionModel.findOne({_id: result['question'][i]}, function(err, question){
                  questionList.push(question);
                   if (questionList.length == result['question'].length - 1) {
                     result = result.toObject();
                     result['question'] = questionList;
                     callback(err, result);
                   }
                 });
               }
             } else {
               callback('View paper error, detial: No paper.', null);
             }
           });
         } else {
           callback('View paper error, detial: Cannot pass the auth.', null);
         }
       });
     });
   } catch (e) {
     err = e;
     tracer.error('View paper error, detial:' + err);
     callback(err);
   }
 }

exports.query = function (data, callback) {
  PaperModel.findOne(data, callback);
}

exports.search = function (data, callback) {
  PaperModel.find(data, callback);
}

/**
  *  如果向http://localhost:3000/paper/question/{token}发起创建问卷请求
  *  请求登录
  */
exports.list = function (req, callback) {
  var err, self = this;
  try {
    // 自定义查询adapter，用于查询orgnization和account同时匹配结果
    var adapter = new Controller.Adaper('orgnization account');
    // 将uid和token转成_id和token
    adapter['account'] = new ObjectSet(req.body).selectKey('uid token').modifyKey('_id token').data;
    adapter['orgnization'] = new ObjectSet(req.body).selectKey('oid').modifyKey('_id').data;
    // 利用adaper来验证account和orgnization
    adapter.query(function(err, result){
      if(result) {
        self.search({uid:req.body['uid'], oid:req.body['oid']}, function(err, result){
          callback(err, result);
        });
      } else {
        callback('List paper error, detial: Cannot pass the auth.', null);
      }
    });
  } catch (e) {
    err = e;
    tracer.error('List paper error, detial:' + err);
    callback(err);
  }
}

/**
  *  如果向http://localhost:3000/paper/question/{token}发起创建问卷请求
  *  请求登录
  */
exports.getPaperContent = function (req, callback) {
  var err, self = this;
  try {
    self.query({_id: req.params.pid}, function(err, result){
      if (result) {
        var questionList = [];
        for (var i = 0; i < result['question'].length; i++) {
          QuestionModel.findOne({_id: result['question'][i]}, function(err, question){
           questionList.push(question);
            if (questionList.length == result['question'].length - 1) {
              result = result.toObject();
              result['question'] = questionList;
              result = new ObjectSet(result).selectKey('title question').data;
              callback(err, result);
            }
          });
        }
      } else {
        callback('Get paper content error, detial: No paper.', null);
      }
    });
  } catch (e) {
    err = e;
    tracer.error('Get paper content error, detial:' + err);
    callback(err);
  }
}

/**
  *  如果向http://localhost:3000/paper/question/{token}发起创建问卷请求
  *  请求登录
  */
exports.doPaper = function (req, callback) {
  var err, self = this;
  try {
    resolve.parseAjax(req, 'json', function(data){
      if (!data){
        callback('Do paper error, detial: Submit data invailed.', null);
      } else {
        var resultTicket = new ObjectSet(data).selectKey('cid qid').data;
        var update = new ObjectSet(data).selectKey('cid qid answer timeTickes date').data;
        QuestionModel.findOne( { _id: resultTicket['qid'] }, function(err, question){
          if (question) {
            var result = new ResultModel(update);
            result.save(function(err, result){
              if (result) {
                callback(null, result);
              } else {
                callback('Save the result failed, detial: ' + err, null);
              }
            });
          } else {
            callback('Do paper error, detial: Cannot find the paper.', null);
          }
        });
      }
    });
  } catch (e) {
    err = e;
    tracer.error('Get paper content error, detial:' + err);
    callback(err);
  }
}
