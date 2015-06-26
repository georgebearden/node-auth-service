var User = require('../models/user');

module.exports.usernameExists = function(username) {
	console.log('what ' + username);
	User.findOne({username: username}, function(err, user) {
		if (err) throw err;
		
		if (user) {
			console.log('found user');
			return true;
		}
		else {
			console.log('did not find user');
			return false;
		} 
	});
};