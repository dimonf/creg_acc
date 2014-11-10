"use strict";

module.exports = function(app){
		var index = require('../controllers/s.c.index');
		app.get('/', index.render);
		
}
