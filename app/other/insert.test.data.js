"use strict";

var	assert = require('assert'),
	db_collection = 'data_test',
	async = require('async'),
	work = async.queue(function(doc, done) {
		doc.db_collection.insert([doc.doc], function(err, result) {
			if (err) {
					console.log('error ...' + err);
			}
		});
		done();
	},10),
	MongoClient = require('mongodb').MongoClient,
	no_records = 9999,
	db_url = 'mongodb://localhost:27017/group_map',
	get_transaction = require('./transaction.json');

MongoClient.connect(db_url, function(err, db) {
	assert.equal(null, err);
	console.log(['Connected to server', db_url, db_collection].join(' '));

	var collection = db.collection(db_collection);
	var bulk = db.collection(db_collection).initializeOrderedBulkOp();

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
