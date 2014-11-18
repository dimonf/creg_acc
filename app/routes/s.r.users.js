"use strict";


var users = require('../../app/controllers/s.c.users.js'),
		passport = require('passport');

module.exports = function(app) {
		app.route('/users')
			.post(users.create)
			.get(users.list);
		app.route('/users/:userId')
			.get(users.read)
			.put(users.update)
			.delete(users.delete);
		app.route('/signup')
			.get(users.renderSignup)
			.post(users.signup);
		app.route('/signin')
			.get(users.renderSignin)
			.post(users.signin);
		app.get('/signout', users.signout);
		//
		app.param('userId', users.userById);
}
