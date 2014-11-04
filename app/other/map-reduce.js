"use strict";

var assert = require('assert'),
		config = require('./config'),
		MongoClient = require('mongodb').MongoClient;
	

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

		}
}
		
MongoClient.connect(config.db_url, function(err, db) {
	assert.equal(err, null);	
	console.log(['Connected to server', config.db_url, config.db_collection].join(' '));

	var collection = db.collection(config.db_collection);
	collection.mapReduce(accTotals.map, accTotals.red, 
						{out: {inline:1}}, function(err, results){
			//console.log(results);
			//console.log(get_total(results)*1000000);
			//console.log(results);
			//console.log(get_total(results));
			//console.log(get_amount(get_total(results)));
			get_total(results);
			db.close();
	});
});

function get_total(results){
		var total = 0;
		for (var key in Object.keys(results)) {
				var amount = get_amount(results[key].value.amount);
				results[key].value.a = amount;
				total += amount;
		}
		results.total =  total;
		console.log(results);

/*

		for (var acc in results) {
				//console.log('>' + acc);
				total += results[acc].value.amount;
				//total += acc.value.amount;
		}
	 */
		return total;
}

function get_amount(number) {
	//round 'number' to 2 decimal plces
	return Math.round(number * 100) / 100;
}
