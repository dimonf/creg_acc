'use strict';

//var http_port = 3001;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport'),
	config = require('./config/config'),
	http_port = config.http_port;
var db = mongoose();

var app = express();

//var passport = passport();

app.listen(http_port);

console.log('listening on http://localhost/' + http_port);

module.exports = app;
