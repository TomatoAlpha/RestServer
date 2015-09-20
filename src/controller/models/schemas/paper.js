var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PaperSchema = new Schema({
    createTime  : { type: Date                  },
    title       : { type: String,   default: '' },
    description : { type: String,   default: '' },
    question    : [       Schema.Types.ObjectId ],
    creater     : { type: Schema.Types.ObjectId },
    uid         : { type: Schema.Types.ObjectId },
    cid         : { type: Schema.Types.ObjectId },
    result      : { type: Schema.Types.ObjectId },
    status      : { type: Number,   default: 0  }
});

module.exports = PaperSchema;
