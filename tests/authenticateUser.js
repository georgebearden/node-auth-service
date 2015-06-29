var request = require('request');
var bodyParser = require('body-parser');

// /users, POST, creates a new user
var user = {
	username: "TestUsername",
	password: "TestPassword"	
};

request.post({url: 'http://localhost:8080/auth', form: user}, function(error, response, body) {
	
	var json = JSON.parse(body);
	
	if (!error && response.statusCode == 200) {
		console.log('/auth, POST passed');
		console.log(body);
	}
	else {
		console.log('/auth, POST failed with status code ' + response.statusCode + ', ' + json.errorMessage);
	}
});