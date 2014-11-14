'use strict';


module.exports = {
		get_amount: function(number) {
				//round number to 2 decimal places
				return Math.round(number*100)/100
		}
}
