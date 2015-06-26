// Grab all the modules we require.
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoConfig = require('./config/mongodb');

// Setup the app.
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect our auth service to the users database.
mongoose.connect(mongoConfig.url);