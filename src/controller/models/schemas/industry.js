var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var IndustrySchema = new Schema({
    name        : { type: String,   default: '' },
    avatar      : { type: String,   default: '' }
});

module.exports = IndustrySchema;
