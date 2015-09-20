var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var OrgnizationSchema = new Schema({
    createTime  : { type: Date                  },
    name        : { type: String,   default: '' },
    avatar      : { type: String,   default: '' },
    orgCode     : { type: String,   default: '' },
    creditCard  : { type: String,   default: '' },
    industry    : { type: Schema.Types.ObjectId },
    province    : { type: String,   default: '' },
    address     : { type: String,   default: '' },
    telephone   : { type: String,   default: '' },
    status      : { type: Number,   default: 10 }
});

module.exports = OrgnizationSchema;
