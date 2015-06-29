// Grab all the modules we require.
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Setup the app.
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect our auth service to the users database.
var mongoConfig = require('./config/mongodb');
mongoose.connect(mongoConfig.url);

// Setup the routes.
var users = require('./routes/users');
app.use('/users', users);

var auth = require('./routes/auth');
app.use('/auth', auth);

var port = process.env.PORT || 8080;
app.listen(port);
console.log('server listening on port ' + port);