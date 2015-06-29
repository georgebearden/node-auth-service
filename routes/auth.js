var User = require('../models/user');
var express = require('express');
var router = express.Router();

// authenticates a username and password
router.post('/', function(req, res) {
	
	var username = req.body.username;
	var password = req.body.password;
	
	User.findOne({username: username}, function(err, user) {
		if (err) throw err;
		
		if (!user) {
			res.status(400);
			res.send({errorMessage: 'The username does not exist'});
		}
		else if (!user.isPasswordValid(password)) {
			res.status(400);
			res.send({errorMessage: 'The password is incorrect'});
		}
		else {
			res.send({token: "lakjdsflkajsdf"});
		}
	});
});

module.exports = router;