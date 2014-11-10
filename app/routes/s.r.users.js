"use strict";


var users = require('../../app/controllers/s.c.users.js');

module.exports = function(app) {
		app.route('/users').post(users.create);
}
