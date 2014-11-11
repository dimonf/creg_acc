"use strict";

var User = require('mongoose').model('User');

exports.create = function(req, res, next) {
		var user = new User(req.body);
		user.save(function(err) {
				if (err) {
					next(err);
				} else {
					res.json(user);
				}
		});
};

exports.list = function(req, res, next) {
		User.find({}, function(err, users) {
			if (err) { 
				return next(err);
			} else {
				res.json(users);
			}
		});
}

