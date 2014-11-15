"use strict";

var faker = require('faker'),
	min_postings_per_tr = 2,
	max_postings_per_tr = 5,
	ave_tr_amount = 300,
	roles = ['admin','user','owner'];

var getUser = function() {
		var user = {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
		website: faker.internet.domainName(),
		username: faker.internet.userName(),
		password: faker.internet.password(),
		role: faker.random.array_element(roles),
		soc: faker.random.number(10000)
		}
		return user;
};

module.exports = getUser;
