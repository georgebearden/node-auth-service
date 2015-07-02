var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	username: String,
	password: String,
	createdAt: Date,
	updatedAt: Date
});

userSchema.pre('save', function(next) {
	var now = Date();
	this.updatedAt = now;
	
	if (!this.createdAt)
		this.createdAt = now;
		
	next();
});

userSchema.methods.hash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.isPasswordValid = function(pass) {
	return bcrypt.compareSync(pass, this.password);
};

module.exports = mongoose.model('User', userSchema);