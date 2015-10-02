var crypto = require('crypto');
var tracer = require('./tracer');
var winrar = require('./helperWinrar');
var define = require('./questionDefine');
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
  winrar.unpackage(filepath, picFolder, function(paper, mediaList){
    self.paperParse(paper, mediaList, callback);
  });
}

exports.paperParse = function(paper, mediaList, callback) {
  try {
    var self = this, paperCache = paper.data.split('\r\n\r\n');
    paper.data = {};
    paper.data['title'] = paperCache[0];
    paper.data['error'] = [];
    paper.data['question'] = [];
    for (var i = 1; i < paperCache.length; i++) {
      var data = self.questionParse(paperCache[i], mediaList);
      if (!data['error']) {
        paper.data['question'].push( data.result );
      } else {
        paper.data['error'].push( data.error );
        tracer.warn('Parse paper which name is"' + paper.data['title'] + '" has something invailed, detial: ' + data.error);
      }
    }
    callback(paper);
  } catch (e) {
    tracer.error('Paper parse has something error, detial: ' + e.message);
    callback({ error: 'Paper parse has something error, detial: ' + e.message, data: null });
  }
}

exports.questionParse = function(textData, mediaList){
  try {
    var question = { 'checks': []}, self = this;

    if(!textData) throw 'Question content is null.';
    textData = textData.replace(/^\s+|\s+$/, '').split('\r\n');

    question['order'] = +textData[0].match(/\d\./)[0].replace('.', '');
    if( isNaN(question['order']) ) throw 'Question order is not correct.';

    questionText = textData[0].replace(question['order'] + '.', '').replace(/\]$/, '').split(/\]\[|\[/g);
    question['content'] = { 'text': questionText[0] };
    for (var i = 0; i < questionText.length; i++) {
      var attribute = questionText[i].trim().split(':')[0];
      var value = questionText[i].trim().split(':')[1];
      switch (attribute) {
        case '图片': case '视频':
          question['content']['url'] = self.selectMediaUrl(value, mediaList);
          if(!question['content']['url']) tracer.warn('Select Media Url invailed, detial: Cannot find the media named "' + value + '".');
          break;
        case '分组':
          question['isGroup'] = true;
          question['group'] = value;
          break;
        case '单选题':
          question['type'] = 1;
          break;
        case '多选题':
          question['type'] = 2;
          question['minMult'] = value.split('/')[0];
          question['maxMult'] = value.split('/')[1];
          break;
        case '问答题':
          question['type'] = 3;
        default: break;
      }
    }

    for (var i = 1; i < textData.length; i++) {
      var check = {};
      check['order'] = textData[i].trim().match(/\D\./)[0].replace('.', '').trim();
      checkText = textData[i].replace(check['order'] + '.', '').replace(/\]$/, '').split(/\]\[|\[/g);
      check['content'] = { 'text': checkText[0].trim() };
      checkText.forEach(function(key){
        var attribute = key.trim().split(':')[0];
        var value = key.trim().split(':')[1];
        switch (attribute) {
          case '图片': case '视频':
            check['content']['url'] = self.selectMediaUrl(value, mediaList);
            break;
          default:
            break;
        }
      });
      question['checks'].push(check);
    }
    return { error: null, result: question };
  } catch (e) {
    var error = 'Question data parse failed, detial: ' + e.message;
    // tracer.error(error);
    return { error: error, result: null };
  }
}

exports.selectMediaUrl = function(mediaName, mediaList){
  try {
    for (var i = 0; i < mediaList.length; i++) {
      if (mediaList[i].fullName == mediaName) {
        return mediaList[i].url;
      }
    }
    throw 'Cannot find the media named "' + mediaName + '"';
  } catch (e) {
    console.log('Select Media Url failed, detial: ' + e.toString());
    return null;
  }
};
