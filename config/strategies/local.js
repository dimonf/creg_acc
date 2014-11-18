"use strict";

var passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		User = require('mongoose').model('User');

module.exports = function() {
		passport.use(new LocalStrategy(function(username, password, done) {
			User.findOne({username: username}, function(err, user){
				console.log('authentication:', err);
				if (err) {
					return done(err);
				} 

				if (!user) {
					return done(null, false, {
						message: 'no user found'
					});
				}

				if (! user.authenticate(password)) {
					return done(null, false, {
						message: 'Invalid password'
					});
				}

				done(null, user);
			});
		}));
}
