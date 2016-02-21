var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ContactSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, index: {unique: true}},
	number: Number
});


module.exports = mongoose.model('Contact', ContactSchema);