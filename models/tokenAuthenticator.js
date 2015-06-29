var jwt = require('jsonwebtoken');
var authConfig = require('../config/auth.js');

var authenticateToken = function(req, res, next) {
	var token = req.headers['x-access-token'];
	if (token) {
		
		jwt.verify(token, authConfig.secret, function(err, decoded) {
			if (err) {
				return res.json({
					message: 'Failed to authenticate token'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			message: "No token"
		});
	}
};

module.exports = authenticateToken;