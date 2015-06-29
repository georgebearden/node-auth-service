var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	username: String,
	password: String
});

userSchema.methods.hash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.isPasswordValid = function(pass) {
	console.log('pass              ' + pass);
	console.log('this.password     ' + this.password);
	return bcrypt.compareSync(pass, this.password);
};

module.exports = mongoose.model('User', userSchema);