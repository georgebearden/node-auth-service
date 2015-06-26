var request = require('request');
var bodyParser = require('body-parser');

// /users, POST, creates a new user
var newUser = {
	username: "TestUsername",
	password: "TestPassword"	
};
request.post({url: 'http://localhost:8080/users', form: newUser}, function(error, response, body) {
	
	var json = JSON.parse(body);
	
	if (!error && response.statusCode == 200) {
		console.log('/users, POST passed');
	}
	else {
		console.log('/users, POST failed with status code ' + response.statusCode + ', ' + json.errorMessage);
	}
});