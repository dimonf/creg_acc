'use strict';

var config = require('./config'),
	 express = require('express'),
	 morgan = require('morgan'),
	 compress = require('compression'),
	 bodyParser = require('body-parser'),
	 methodOverride = require('method-override'),
	 session = require('express-session'),
	 passport = require('passport');

module.exports = function() {
	var app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.set('views','./app/views');
	app.set('view engine', 'ejs');

	app.use(passport.initialize());
	app.use(passport.session());

	//routing files
	require('../app/routes/s.index_r.js');	
	require('../app/routes/s.entity_r.js');

	app.use(express.static('./public'));
	return(app);
	
}
