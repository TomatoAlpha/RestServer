var OrgnizationModel = require('./models/models').orgnization;
var resolve = require('../utility/resolve');

exports.demoFunc = function (data, callback) {

}

exports.query = function (data, callback) {
  OrgnizationModel.findOne(data, callback);
}
