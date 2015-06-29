var User = require('../models/user');
var tokenAuthenticator = require('../models/tokenAuthenticator');
var express = require('express');
var router = express.Router();

// Create a new user.
router.post('/', function(req, res) {
	
	var username = req.body.username;
	var password = req.body.password;
	
	User.findOne({username: username}, function(err, userExists) {
		if (err) throw err;
		
		if (userExists) {
			res.status(400);
			res.send({errorMessage: 'The username ' + username + ' already exists.'});
		}
		else {
			var user = new User();
			user.username = username;
			// Make sure to hash the password before storing in the database.
			user.password = user.hash(password);
			user.save(function(err) {
				if (err) throw err;
				
				res.status(200);
				res.send({
					userId: user._id,
					message: "User created"
				});
			});
		}
	});
});

router.get('/:user_id', function(req, res) {
	
	console.log('searching for user with id: ' + req.params.user_id);
	
	User.findById(req.params.user_id, function (err, user) {
		if (err) {
			res.send(err);
		} else {
			
			console.log(user);
			
			res.json(user);
		}
	});
});

module.exports = router;