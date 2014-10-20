'use strict';

var config = require('./config'),
	 mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);

	require('../app/models/s.user_m');

	return db;
}
