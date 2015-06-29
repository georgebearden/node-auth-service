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
		var token = json.token;
		
		var opts = {
			url: 'http://localhost:8080/users/' + json.userId,
			headers: {
				'x-access-token': token
			}
		};
		
		console.log(opts.url);
		
		request.get(opts, function(e, r, b) {
			
			json = JSON.parse(b);
			
			console.log('doing get');
			console.log(json);
		});
	}
	else {
		console.log('/auth, POST failed with status code ' + response.statusCode + ', ' + json.errorMessage);
	}
});