"use strict";

var User = require('mongoose').model('User'),
		passport = require('passport');

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

exports.renderSignin = function(req, res, next){
		if (!req.user){
			res.render('signin',{
				title: 'Sign-in Form',
				messages: req.flash('error') || req.flash('info')
			});
		} else {
			return res.redirect('/');
		}		
};

exports.signin = function(req, res, next){
	console.log('signin_controller');
	passport.authenticate('local', function(err, user, info) {
		if (err) {return next(err);}
		if (!user) {
				req.flash('error',info.message);
				console.log('cant find user '+JSON.stringify(info));
				return res.redirect('/signin');
		}
		req.login(user, function(err) {
			if (err){return next(err);}
			return res.redirect('/');
		});
	})(req, res, next);
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		});
	} else {
		res.redirect('/');
	}
};

exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body),
				message = null;

		user.provider = 'local';

		user.save(function(err) {
				if (err) {
						console.log(err);
						var message = getErrorMessage(err);
						req.flash('error', message);
						return res.redirect('/signup');
				}
				req.login(user, function(err){
					if (err) return next(err);
					res.redirect('/');
				});
		});
	} else {
		res.redirect('/');
	}
}

exports.signout = function(req, res, next) {
		req.logout();
		res.redirect('/');
}

var getErrorMessage = function(err) {
		var message = '';

		if (err.code) {
			switch (err.code) {
				case 11000:
				case 11001:
					//duplication of 'unique' indexed value
					var m_a = err.err.match(/key error index:.*(\$\S+).*(dup key.*)/);
					message = [m_a[1], m_a[2]].join(' ');
					//message = 'Username already exists';
					break;
				default:
					message = 'Something wrong';
			}
		} else {
				for (var errName in err.errors) {
						if (err.errors[errName].message) {
							message = err.errors[errName].message;
						}
				}
		}
		return message;
};
