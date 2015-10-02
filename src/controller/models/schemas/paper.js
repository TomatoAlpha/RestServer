var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PaperSchema = new Schema({
    createTime  : { type: Date                  },
    title       : { type: String,   default: '' },
    description : { type: String,   default: '' },
    question    : [       Schema.Types.ObjectId ],
    uid         : { type: Schema.Types.ObjectId },
    oid         : { type: Schema.Types.ObjectId },
    result      : { type: Schema.Types.ObjectId },
    status      : { type: Number,   default: 0  },
    error       : { type: String,   default: null}
});

module.exports = PaperSchema;
