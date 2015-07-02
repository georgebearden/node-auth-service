var request = require('request');

var user = {
	username: "TestUsername",
	password: "TestPassword"	
};

request.get({url: 'http://localhost:8080/api/1/auth', form: user}, function(error, response, body) {
	if (error) {
		console.log('/auth, GET, ' + response.statusCode + ' ' + body);
	} else {
		var json = JSON.parse(body);
		var token = json.accessToken;
		var opts = {
			url: 'http://localhost:8080/api/1/users/' + json.id,
			headers: {
				'x-access-token': token
			}
		};
		
		request.get(opts, function(e, r, b) {
			if (error) {
				console.log(error);
			} else {
				console.log('/api/1/users/:user_id, GET, ' + r.statusCode + ' ' + b);
			}
		});
	}
});