var AccountModel = require('./models/models').account;
var resolve = require('../utility/resolve');
var authority = require('../../config').authority;

exports.query = function (data, callback) {
  AccountModel.findOne(data, callback);
}

exports.createUser = function (data, callback) {
  var username = resolve.selectKey(data, 'username');
  AccountModel.findOne(username, function(err, result){
    if (err == null && result == null) {
      data['token'] = resolve.createToken(data);
      var account = new AccountModel(data);
      account.save(callback);
    } else {
      if (err == null) callback(err, null, 0);
      else callback('Existed', null, 0);
    }
  });
}

exports.update = function (executor, update, callback) {
  var executor = resolve.selectKey(executor.executor, '_id token');
  var updateAccount = resolve.selectKey(update.update, '_id');
  AccountModel.findOne(executor, function(err, result){
    if(result != null) {
      if(result.authority <= authority.userAdmin || updateAccount['_id'] == executor['_id']) {
        update = resolve.deleteKey(update.update, '_id token username createTime orgnization password');
        var options = { new : true };
        AccountModel.findOneAndUpdate(updateAccount, update, options, callback);
      }
    } else {
      callback(null, null);
    }
  });
}
