var jwt = require('jsonwebtoken');
var secret = require('../config/secret');

var authenticate = function(req, res, next) {
	var token = req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, secret.jwtSecretKey, function(err, decoded) {
			if (err) {
				res.status(401);
				res.send({
					statusCode: 401,
					error: 'The provided accessToken was not valid'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.status(401);
		res.send({
			statusCode: 401,
			error: 'No accessToken was provided with this request'
		});
	}
};

module.exports.authenticate = authenticate;