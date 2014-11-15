"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../../../config/config'),
		http = require("http"),
		options = {
				host: 'localhost',
				path: '/users',
				method: 'POST',
				port: config.http_port,
				//headers: {'Content-Type': 'application/json'}
		},
		get_user = require('./user.json');

for (var i=0; i < 30; i++) {
	var req = http.request(options);
	var user = get_user();
	//console.log('>>' + JSON.stringify(user));
	req.setHeader('Content-Type','application/json');
	req.write(JSON.stringify(user));
	req.end();
	req.on('error', function(e) {
			console.log('>> error');
			console.log(e);
	});
	req.on('response', function(res){
			var str = "";

			console.log('- on req.on("response") event');

			res.on('data', function(chunk) {
				str += chunk;
			});

			res.on('end', function() {
				console.log('- on.end');
				//console.log('STATUS:' + res.statusCode);
				//console.log('HEADERS:' + JSON.stringify(res.headers));
				//res.setEncoding('utf8');
				//console.log('BODY:' + str);
			});
			res.on('data', function(chunk) {
					//console.log('- on.data ' + chunk);
			});
	});
	console.log(':::'+i);
}
	
