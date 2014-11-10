'use strict';

var mongoose = require('mongoose'),
	 Schema = mongoose.Schema;

var UserSchema = new Schema ({
	firstName: String,
	lastName: String,
	email: {
		type: String,
	 	index: true,
	 	match: /.+\@.+\..+/,
		required: true
	 },
 	username: String,
	password: {
		type: String,	  
	 	validate: [
		  function(password){
				return password.length >=8
		  },
	 		'password shall be at least 8 characters long'
		],
	},
	role: {
		type: String,
	 	enum: ['admin', 'owner', 'user' ]
	},
	created: {
		type: Date,
		default: Date.now
	}
});

UserSchema.methods.authenticate = function(password){
	return this.password === password;
}

UserSchema.set('toJSON', {
		  getters: true,
		  virtuals: true
});

mongoose.model('User', UserSchema);
