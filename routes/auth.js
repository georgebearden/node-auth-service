var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
var router = require('express').Router();

// authenticates a username and password
router.get('/auth', function(req, res) {
	
	var username = req.body.username;
	var password = req.body.password;
	
	User.findOne({username: username}, function(err, user) {
		if (err) {
			res.status(500);
			res.send({
				statusCode: 500,
				error: err		
			});
		} else if (!user) {
			res.status(401);
			res.send({
				statusCode: 401,
				error: 'The username ' + username + 'does not exist'
			});
		} else if (!user.isPasswordValid(password)) {
			res.status(401);
			res.send({
				statusCode: 401,
				error: 'The password is invalid'
			});
		} else {
			var accessToken = jwt.sign(user, secret.jwtSecretKey, {
				expiresInMinutes: 9999
			});
			
			res.status(200);
			res.send({
				id: user._id,
				username: user.username,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				accessToken: accessToken,
				expiresIn: 9999
			});
		}
	});
});

module.exports = router;