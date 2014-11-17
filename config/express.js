'use strict';

var config = require('./config'),
	 express = require('express'),
	 morgan = require('morgan'),
	 compress = require('compression'),
	 bodyParser = require('body-parser'),
	 methodOverride = require('method-override'),
	 session = require('express-session'),
	 flash = require('connect-flash'),
	 passport = require('passport');

module.exports = function() {
	var app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
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

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	//routing files
	require('../app/routes/s.r.index.js')(app);	
	require('../app/routes/s.r.users.js')(app);

	app.use(express.static('./public'));
	return(app);
	
}
