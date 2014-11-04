"use strict";

var	assert = require('assert'),
	config = require('./config'),
	MongoClient = require('mongodb').MongoClient,
	no_records = 9999,
	get_transaction = require('./transaction.json');

MongoClient.connect(config.db_url, function(err, db) {
	assert.equal(null, err);
	console.log(['Connected to server', config.db_url, config.db_collection].join(' '));

	var collection = db.collection(config.db_collection);

	for (var i=0; i<no_records; i++) {
		collection.insert(get_transaction(), function(err, result){
				if (err) {
					console.log(err);
				} 
		});
		console.log(['inserted ' , i, ' record'].join(' '));

	}
	console.log('>>inserted ' + no_records + ' records');
});
