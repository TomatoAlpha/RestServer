var mongoose = require('mongoose');

module.exports = {
	// session: mongoose.model('session', require('./schemas/session')),
	account: 			mongoose.model('account', require('./schemas/account')),
	industry:			mongoose.model('industry', require('./schemas/industry')),
	orgnization:	mongoose.model('orgnization', require('./schemas/orgnization')),
	paper:				mongoose.model('paper', require('./schemas/paper')),
	question:			mongoose.model('question', require('./schemas/question')),
	client:				mongoose.model('client', require('./schemas/client')),
	result:				mongoose.model('result', require('./schemas/result'))
}
