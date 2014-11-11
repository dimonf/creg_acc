"use strict";

var assert = require('assert'),
		config = require('./config'),
		MongoClient = require('mongodb').MongoClient,
		utils = require('./utils');
	

var accTotals = {
		map: function() {
				for (var idx = 0; idx < this.postings.length; idx ++) {
						var key = this.postings[idx].account;
						var val = {
										amount: this.postings[idx].dtct === 'dt' ? 
								this.postings[idx].amount : -this.postings[idx].amount,
						};
						emit(key, val);
				}
		},
		red: function(key, vals) {
				red_val = {amount: 0};
				for (var idx = 0; idx < vals.length; idx ++) {
						red_val.amount += vals[idx].amount;
				}
				return red_val;
		},
		fin: function(key, red_val) {
				//return red_val;
				red_val.amount = utils.get_amount(red_val.amount);
				//red_val.amount_o = Math.round(10*red_val.amount)/10;
				//red_val.amount = Math.round(10*red_val.amount)/10;
				return red_val;
		}
}

MongoClient.connect(config.db_url, function(err, db) {
	assert.equal(err, null);	
	console.log(['Connected to server', config.db_url, config.db_collection].join(' '));

	var collection = db.collection(config.db_collection);
	collection.mapReduce(accTotals.map, accTotals.red, 
			{
					out: {replace:config.db_collection_mr_out},
					finalize: accTotals.fin,
					scope: {'utils':utils}
			}, function(err, results){
				console.log(results);
				//get_totals helpful with '{out: {inplace:1}}' option only.
				//get_total(results);
				db.close();
	});
});

function get_total(results){
		var total = 0,
				total_raw = 0,
				amount = 0;
		for (var key in Object.keys(results)) {
				amount = utils.get_amount(results[key].value.amount);
				results[key].value.a = amount;
				total += amount;
				total_raw += results[key].value.amount;

		}
		results.total =  total;
		results.total_raw = total_raw;
		console.log(results);

		//return total;
}

