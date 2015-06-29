var User = require('../models/user');

module.exports.usernameExists = function(username, callback) {
	User.findOne({username: username}, function(err, user) {
		if (err) callback(err);
		
		if (user) {
			callback(null, true);
		}
		else {
			callback(null, false);
		} 
	});
};