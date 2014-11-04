"use strict";

var faker = require('faker'),
	utils = require('./utils'),
	min_postings_per_tr = 2,
	max_postings_per_tr = 5,
	ave_tr_amount = 300,
	companies = ['Forcon Ltd', 'Conshipment', 'Andelica', 'Vistrou'],
	tr_statuses = ['deleted','posted', 'pending'],
	tags_budgets = ['budget_a', 'budget_b'],
	tags_projects = ['project_a', 'project_b','project_c'],
	accounts = ['01.01','01.02','04.01','04.02','51.01','60','63.01','63.02','50'],
	getTransaction = function() {

		var tr = {
			date: faker.date.past(10),
			co: faker.random.array_element(companies),
			status: faker.random.array_element(tr_statuses),
			narrative: faker.lorem.sentence(1),
			postings: get_postings()
		};

		return tr;
	};

function get_postings() {
		var p_number = Math.ceil(Math.random() * (max_postings_per_tr - 
					min_postings_per_tr)) + min_postings_per_tr,
					dtct = faker.random.array_element(['dt','ct']),
					p = [], p_amount = 0, t_balance = 0;

			for (var i=1; i<=p_number; i++) {
				if (p.length === 0) {
					p_amount = utils.get_amount(Math.random() * ave_tr_amount * 2 
							* (p_number - 1) / p_number + ave_tr_amount / 2);
					t_balance = p_amount;
				} else if (p.length < p_number - 1) {
						if (t_balance === 0) {
								break;
						}
						p_amount = utils.get_amount(Math.random() * ave_tr_amount * 2 
							/ p_number);
						if (p_amount > t_balance) {
									p_amount = t_balance;
						}
						t_balance -= p_amount;
				} else  {
						p_amount = utils.get_amount(t_balance);
				}
				//console.log("_"+p_amount+"/"+t_balance);

				var p_i = {
						status: 'ok',
						dtct: dtct,
						account: faker.random.array_element(accounts),
						details: faker.lorem.sentence(1),
						tags: [
							faker.random.array_element(tags_budgets),
							faker.random.array_element(tags_projects)
						],
						amount: p_amount,
						currency: 'EUR',
						base_amount: 0 
				}

				if (p.length === 0) {
					//first posting in transaction
					dtct = dtct === 'dt' ? 'ct' : 'dt';
				}

				p.push(p_i);
			}	
			return p;
}

function get_average(number) {
	//
	return Math.random() * number * 2;
}

module.exports = getTransaction;
