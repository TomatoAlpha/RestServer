var AccountController = require('./AccountController');
var OrgnizationController = require('./OrgnizationController');
var PaperController = require('./PaperController');
var tracer = require('../utility/tracer');
/**
 *  如果向http://localhost:3000/paper/create发起创建问卷请求
 *  请求登录
 */
function Adaper (controllersName) {
  var self = this;
  this.controllers = {};
  this.controllersName = controllersName.replace(/[ ]{2,}/g,' ').replace(/^[ ]|[ ]$/g,'').split(' ');
  this.controllersName.forEach(function(controller){
    switch (controller) {
      case 'orgnization':
        self.controllers[controller] = OrgnizationController;
        break;
      case 'industry':
        break;
      case 'paper':
        self.controllers[controller] = PaperController;
        break;
      case 'account':
        self.controllers[controller] = AccountController;
        break;
      case 'client':
        break;
      default:
    }
  });
    return this;
}

exports.Adaper = Adaper;

Adaper.prototype.query = function (callback) {
  var self = this, queryResult = true, queryCount = 0, error;
  try {
    this.controllersName.forEach(function(controllerName){
      self.controllers[controllerName].query(self[controllerName], function(err, result){
        if(result == null){
          queryResult = false;
          tracer.error('Adaper query in controller "' + controllerName +'" error, detial:' + err);
        }
        queryCount++;
        if(queryCount == self.controllersName.length){
          callback(err, queryResult);
        }
      });
    });
  } catch (e) {
    tracer.error('Adaper query has something error, detial:' + err);
    callback(err, false);
  }
}
