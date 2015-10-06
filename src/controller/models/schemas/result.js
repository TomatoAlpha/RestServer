var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ResultSchema = new Schema({
    cid         : { type: String,   default: '' },
    qid         : { type: Schema.Types.ObjectId },
    answer      : { type: String,   default: '' },
    timeTickes  : { type: Number,   default: 0  },
    date        : { type: Date                  }
});

module.exports = ResultSchema;
