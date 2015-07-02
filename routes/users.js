var User = require('../models/user');
var tokens = require('../models/tokens');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
var router = require('express').Router();
var appConfig = require('../config/appConfig')

// Create a new user.
router.post('/users', function(req, res) {
	
	var username = req.body.username;
	var password = req.body.password;
	
	User.findOne({username: username}, function(err, userExists) {
		if (err) throw err;
		
		if (userExists) {
			res.status(406);
			res.send({ 
				statusCode: 406,
				error: 'The username ' + username + ' is not available'	
			});
		}
		else {
			var user = new User();
			user.username = username;
			// Make sure to hash the password before storing in the database.
			user.password = user.hash(password);
			user.save(function(err) {
				if (err) {
					res.status(500);
					res.send({
						statusCode: 500,
						error: err	
					});
				} else {
					
					var accessToken = jwt.sign(user, secret.jwtSecretKey, {
						expiresInMinutes: 9999
					});
					
					res.status(201);
					res.setHeader('Location', appConfig.domain + appConfig.apiPath + '/users/' + user._id);
					res.send({
						id: user._id,
						createdAt: user.createdAt,
						accessToken: accessToken,
						expiresIn: 9999
					});
				}
			});
		}
	});
});

router.get('/users/:user_id', tokens.authenticate, function(req, res) {
	User.findById(req.params.user_id, function (err, user) {
		if (err) {
			res.status(500);
			res.send({
				statusCode: 500,
				error: err	
			});
		} else if (!user) {
			res.status(400);
			res.send({
				statusCode: 400,
				error: 'Received unknown id: ' + req.params.user_id
			});
		} else {
			res.status(200);
			res.send({
				id: user._id,
				username: user.username,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			});
		}
	});
});

module.exports = router;