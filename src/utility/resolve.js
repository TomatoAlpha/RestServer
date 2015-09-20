var crypto = require('crypto');
var tracer = require('./tracer');
var winrar = require('./helperWinrar');
var adaper = require('./paperParser');
/***
 *  Select Key form object
 **/
exports.selectKey = function (data, keyString) {
  try {
    if(typeof data == 'object'){
      var result = {};
      keyString = keyString.replace(/[ ]{2,}/g,' ').replace(/^[ ]|[ ]$/g,'');
      var keys = keyString.split(' ');
      keys.forEach(function(key){
        if(data[key] == undefined){
          throw 'The key "' + key + '" is not in data.';
        }
        if (data[key] != ''){
          result[key] = data[key];
          tracer.verbose('Select the key "' + key + '" in data. The Value is "' + data[key].toString() + '".');
        }
        else
          throw 'The key "' + key + '" is empty.';
      });
      return result;
    } else {
      throw 'The data is not object.';
    }
  } catch (e) {
    tracer.error('Cannot select keys "' + keyString + '" form data, detial:' + e);
    return null;
  }
}

/***
 *  Delete Key form object
 **/
exports.deleteKey = function (data, keyString) {
  try {
    keyString = keyString.replace(/[ ]{2,}/g,' ').replace(/^[ ]|[ ]$/g,'');
    var keys = keyString.split(' ');
    keys.forEach(function(key){
      if (data[key] != undefined){
        data[key] = undefined;
        tracer.verbose('The key "' + key + '" in data has been deleted.');
      } else {
        tracer.verbose('The key "' + key + '" in data has been undefined already, ignore delete action.');
      }
    });
    return data;
  } catch (e) {
    tracer.error('Cannot delete keys "' + keyString + '" form data, detial:' + e);
  }
}

/***
 *  Redefine the Key name form object
 **/
exports.modifyKey = function (data, keyString) {
  var result = {}, index = 0;
  keyString = keyString.replace(/[ ]{2,}/g,' ').replace(/^[ ]|[ ]$/g,'');
  var keys = keyString.split(' ');
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      result[keys[index]] = data[key];
      index++;
    }
  }
  return result;
}

exports.createToken = function (data) {
  data['createTime'] = new Date(Date.now());
  var md5 = crypto.createHash('md5');
  return md5.update( data.username + data.password + data.createTime.toString()).digest('base64');
}

// 非Form来POST的Ajax，传递的是非标准化字符串json
exports.parseAjax = function (req, format, callback) {
  format = format.toLowerCase();
  switch (format) {
    case 'json':
        req.setEncoding('utf8');
        req.on('data', function(chunk){
          chunk = JSON.parse(chunk);
          callback(chunk);
        });
      break;
    default:
        req.setEncoding('utf8');
        req.on('data', callback);
      break;
  }
}

exports.paperUnpackageAndParse = function(filepath, picFolder, callback) {
  var self = this;
  winrar.unpackage(filepath, picFolder, function(paper, picList){
    console.log(paper);
    self.paperParse(picList, callback);
  });
}

exports.paperParse = function(paperData, callback) {

  callback(paperData);
}
