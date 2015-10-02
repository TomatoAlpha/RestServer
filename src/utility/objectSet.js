var tracer = require('./tracer');

function ObjectSet(originalData) {
  try {
    if (!(this instanceof ObjectSet)) return new ObjectSet(originalData);
    if (typeof originalData != 'object') throw 'Argument is not object'; // 如果originalData不是object，报错
    this.data = originalData; // 载入原始对象
    return this;  // 返回实例
  } catch (e) {
    tracer.error('ObjectSet constructor error, detial: ' + e);
  }
}

exports.ObjectSet = ObjectSet;

ObjectSet.prototype.selectKey = function(keyString) {
  var self = this;
  try {
    var temp = {};
    keyString = keyString.trim().replace(/[ ]{2,}/g,' ');
    var keys = keyString.split(' ');
    keys.forEach(function(key){
      if(self.data[key] == undefined){
        throw 'The key "' + key + '" is not in object.';
      }
      temp[key] = self.data[key];
      tracer.verbose('Select the key "' + key + '" in data. The Value is "' + self.data[key].toString() + '".');
    });
    self.data = temp;
  } catch (e) {
    self.data = null;
    tracer.error('Cannot select keys "' + keyString + '" form data, detial: ' + e);
  } finally {
    return this;
  }
}

ObjectSet.prototype.deleteKey = function(keyString) {
  try {
    var self = this;
    keyString = keyString.trim().replace(/[ ]{2,}/g,' ');
    var keys = keyString.split(' ');
    keys.forEach(function(key){
      if (self.data[key] != undefined){
        self.data[key] = undefined;
        tracer.verbose('The key "' + key + '" in data has been deleted.');
      } else {
        tracer.verbose('The key "' + key + '" in data has been undefined already, ignore delete action.');
      }
    });
  } catch (e) {
    tracer.error('Cannot delete keys "' + keyString + '" form data, detial: ' + e);
  } finally {
    return this;
  }
}

ObjectSet.prototype.modifyKey = function(keyString) {
  try {
    var temp = {}, index = 0, self = this;
    keyString = keyString.trim().replace(/[ ]{2,}/g,' ');
    var keys = keyString.split(' ');
    for (var key in self.data) {
      if (self.data.hasOwnProperty(key)) {
        temp[keys[index]] = self.data[key];
        index++;
      }
    }
    self.data = temp;
  } catch (e) {
    tracer.error('Cannot modify keys "' + keyString + '" form data, detial: ' + e);
  } finally {
    return this;
  }
}
