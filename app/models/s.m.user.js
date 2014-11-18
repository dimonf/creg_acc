'use strict';

var mongoose = require('mongoose'),
	 Schema = mongoose.Schema,
	 crypto = require('crypto');

var UserSchema = new Schema ({
	firstName: String,
	lastName: String,
	email: {
		type: String,
	 	index: true,
		unique: true,
	 	match: /.+\@.+\..+/,
		required: true
	 },
	website:{
		type: String,
		set: function(url){
			if (!url) {
				return url;
			} else {
				if (url.indexOf('http://') !==0 && 
						url.indexOf('https://') !==0){
								url = ['http://', url].join('');
						}
				return url;
			}
		}
	},
 	username: {
			type: String,
			unique: true,
			required: 'username required',
			trim: true
	},
	password: {
		type: String,	  
	 	validate: [
		  function(password){
				return password && password.length >=8
		  },
	 		'password shall be at least 8 characters long'
		],
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerId: String,
	providerData: {},
	role: {
		type: String,
	 	enum: ['admin', 'owner', 'user' ],
	},
	created: {
		type: Date,
		default: Date.now
	},
	soc:{
		type: String,
	}

});

UserSchema.virtual('fullName').get(function(){
	return [this.firstName, this.lastName].join(' ');
});

UserSchema.pre('save', function(next){
		if (this.password) {
			this.salt = new
				Buffer(crypto.randomBytes(16).toString('base64'),'base64');
			this.password = this.hashPassword(this.password);
		}
		next();
});

UserSchema.methods.hashPassword = function(password){
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password){
	console.log('>'+this.password, password, this.hashPassword(password));
	return this.password === this.hashPassword(password);
}

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
		var _this = this;
		possibleUsername = username + (suffix || '');

		_this.findOne({
				username: possibleUsername
		}, function(err, user) {
				if (!err) {
					if (!user) {
						callback(possibleUsername);
					} else {
						return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
					}
				} else {
					callback(null);
				}
		});
};

UserSchema.set('toJSON', {
		  getters: true,
		  virtuals: true
});

mongoose.model('User', UserSchema);
