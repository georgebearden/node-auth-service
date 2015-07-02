var request = require('request');

var user = {
	username: "TestUsername",
	password: "TestPassword"	
};

request.get({url: 'http://localhost:8080/api/1/auth', form: user}, function(error, response, body) {
	
	if (error) {
		console.log(error);
	} else {
		console.log('/users, POST, ' + response.statusCode + ' ' + body);
	}
});