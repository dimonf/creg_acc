total = {
	_id: "YYYY-MM_DOMAIN_LAYER_REGISER",
	value: {
			period: 'YYYY-MM',
			domain: 'company_id',
			layer: 'layer_id',
			register: 'ACC_ID|customer_ID|project_ID|cost_category',
			totals:{
					'USD':{
							'dt': 241.22,
							'ct': 244.12,
					},
					'EUR':{
							'dt': 184.21,
							'ct': 188.03
					}
			},
	}
}

/*
 * 1. standard period is a month (easy to change to any period)
 * 2. only dt and ct turnover totals are stored; b/f and c/f 
 *    balances are calculated dynamically at each request
 * 3. there may be several layers within a domain, eg
 *    'fin_data','debtors_creditors','projects' etc, depending
 *    on the needs of particular application
 * 4. the notion of 'base currency' is not reflected in the 
 *    data structure: totals are grouped by commodity id (the
 *    paradigm was stolen from ledger cli project)
 * 5. 
 *
*/
