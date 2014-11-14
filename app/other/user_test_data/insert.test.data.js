"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../../../config/config'),
		http = require("http"),
		options = {
				host: 'localhost',
				path: '/users',
				method: 'GET',
				port: config.http_port,
				headers: {'Content-Type': 'application/json'}
		},
		get_user = require('./user.json');

var callback = function(res) {
		var str = "";

		res.on('data', function(chunk) {
				str += chunk;
		});

		res.on('end', function() {
			console.log('STATUS:' + res.statusCode);
			console.log('HEADERS:' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			//console.log('BODY:' + str);
		});
}

for (var i=0; i < 25; i++) {
	var req = http.request(options, callback),
			user = get_user();
	console.log('>>' + JSON.stringify(user));
	//req.write(user);
	req.end();
}


