var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CheckSchema = new Schema({
    order       : { type: String,   default: '' },
    content     : {
      text      : { type: String,   default: '' },
      url       : { type: String,   default: '' }
    }
});

var QuestionSchema = new Schema({
    order         : { type: Number,    default: 0     },
    type          : { type: Number,    default: 1     },
    checks        : [ CheckSchema                     ],
    isGroup       : { type: Boolean,   default: false },
    group         : { type: String,    default: ''    },
    maxMult       : { type: Number,    default: 1     },
    minMult       : { type: Number,    default: 1     },
    content       : {
      text        : { type: String,   default: ''     },
      url         : { type: String,   default: ''     }
    }
});

module.exports = QuestionSchema;
