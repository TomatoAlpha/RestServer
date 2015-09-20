var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AccountSchema = new Schema({
    token       : { type: String,   default: '' },
    username    : { type: String,   default: '' },
    password    : { type: String,   default: '' },
    createTime  : { type: Date                  },
    nickName    : { type: String,   default: '' },
    name        : { type: String,   default: '' },
    avatar      : { type: String,   default: '' },
    gender      : { type: String,   default: '' },
    education   : { type: String,   default: '' },
    identity    : { type: String,   default: '' },
    creditCard  : { type: String,   default: '' },
    orgnization : { type: Schema.Types.ObjectId },
    province    : { type: String,   default: '' },
    address     : { type: String,   default: '' },
    mobile      : { type: String,   default: '' },
    telephone   : { type: String,   default: '' },
    email       : { type: String,   default: '' },
    authority   : { type: Number,   default: 0  },
    status      : { type: Number,   default: 0  }
});

module.exports = AccountSchema;
