"use strict";

var User = require('mongoose').model('User');

exports.userById = function(req, res, next, id) {
		User.findOne({
				_id: id
		}, function (err, doc) {
				if (err) {
					return next(err);
				} else {
					req.user = doc;
					next();
				}
		});
};

exports.read = function(req, res, next) {
		res.json(req.user);
};

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
};

exports.update = function(req,res,next) {
		User.findByIdAndUpdate(req.user.id, req.body,
			function(err, doc) {
				if (err) {
					return next(err);
				} else {
					res.json(doc);
				}
		});
};

exports.delete = function(req, res, next) {
		req.user.remove(function(err) {
				if (err) {
					return next(err);
				} else {
					res.json(req.user);
				}
		});
};
