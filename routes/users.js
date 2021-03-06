const express = require('express')
,	router = express.Router()
,	passport = require('passport')
,	jwt = require('jsonwebtoken')
,	User = require('../models/user');

router.post('/register', (req, res, next) => {
	console.log("Registering", req.body)
	let newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	User.addUser(newUser, (err, user) => {
		if (err) {
			res.json({success: false, msg:'Failed to register user'})
		} else {
			const token = jwt.sign(user, process.env.SECRET, {
				expiresIn: 604800 // 1 week
			});
			res.json({
				success: true,
				token: 'JWT '+token,
				user: {
					id: user._id,
					name: user.name,
					username: user.username,
					email: user.email,
					image_url: user.image_url,
					first_name: user.first_name,
					last_name: user.last_name,
					account_type: user.account_type
				}
			});
		}
	})
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username)
		.then(user => {
			if(!user){
				return res.json({success: false, msg: 'User not found'})
			}

			User.comparePassword(password, user.password, (err, isMatch) =>{
				if(err) next(err);
				if(isMatch){
					const token = jwt.sign(user, process.env.SECRET, {
						expiresIn: 604800 // 1 week
					});
					res.json({
						success: true,
						token: 'JWT '+token,
						user: {
							id: user._id,
							name: user.name,
							username: user.username,
							email: user.email,
							image_url: user.image_url,
							first_name: user.first_name,
							last_name: user.last_name,
							account_type: user.account_type
						}
					});
				} else {
					return res.json({success: false, msg: 'Wrong password'});
				}
			});

		})
		.catch(err => {
				next(err)
		})
});

router.get('/authenticate', (req, res, next) => {
	res.send('AUTHENTICATE');
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
	res.json({user: req.user});
});



module.exports = router;
