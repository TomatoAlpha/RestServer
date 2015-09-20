var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ClientSchema = new Schema({
    name  : { type: String,   default: '' }
    // need to update
});

module.exports = ClientSchema;
