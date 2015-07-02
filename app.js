// Grab all the modules we require.
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var appConfig = require('./config/appConfig')

// Setup the app.
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(appConfig.mongodbLocation);

// Setup the routes.
var users = require('./routes/users');
app.use(appConfig.apiPath, users);

var auth = require('./routes/auth');
app.use(appConfig.apiPath, auth);

var port = process.env.PORT || 8080;
app.listen(port);
console.log('server listening on port ' + port);