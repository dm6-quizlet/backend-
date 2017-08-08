const mongoose = require('mongoose')
, bcrypt = require('bcryptjs')

// User Schema
const UserSchema = mongoose.Schema({
	username: {
		type: String,
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	first_name: {
		type: String,
	},
	last_name: {
		type: String,
	},
	account_type: {
		type: String,
		default: 'student',
		enum: ['student', 'teacher', 'alien']
	},
	image_url: {
		type: String,
		default: "https://quizlet.com/a/i/animals/14.B9By.jpg"
	},
	facebook_id: {
		type: String
	},
	google_id: {
		type: String
	}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id){
	return User.findById(id);
}

module.exports.getUserByUsername = function(username){
	const query = {username: username}
	return User.findOne(query);
}

module.exports.addUser = function(newUser, callback){
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if(err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		})
	})
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if(err) throw err;
		callback(null, isMatch);
	});
}
