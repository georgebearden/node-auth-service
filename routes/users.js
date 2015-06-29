var auth = require('../models/auth');
var User = require('../models/user');
var express = require('express');
var router = express.Router();

// Create a new user.
router.post('/', function(req, res) {
	
	var username = req.body.username;
	var password = req.body.password;
	
	auth.usernameExists(username, function(err, userExists) {
		
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
				
				console.log('created user: ' + username);
				res.send({token: "lakjdsflkajsdf"});
			});
		}
	});
});

module.exports = router;