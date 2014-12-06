var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Account = require('../models'),
    mongoose = require('mongoose');

var isAuthenticated = function(req, res, next) {
	if (!req.isAuthenticated())
	{
		return next();
	}

	res.redirect('/');
};

router.get('/', function(req, res){
	// res.status(200).send({title: 'Welcome'})});
	var toReturn;
	var link;
	if (req.user){
		toReturn = req.user.username;
		link = '/users/' + req.user.username;
	}
	else
		;
	res.render('index', {'title': 'Welcome, Adventurer', 'user': toReturn, 'userLink': link});
});

router.get('/register', isAuthenticated, function(req, res) {
	res.render('register', { });
});

router.post('/register', isAuthenticated, function(req, res) {
	console.log(req.body);
	Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
		if (err) {
            return res.render('index', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
});

router.get('/login', isAuthenticated, function(req, res) {
	res.render('login', { user : req.user });
});

router.post('/login', isAuthenticated, passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/users/:name', function(req, res) {
	mongoose.model('users').findOne({username: req.params.name}, function(err, users){
		res.send(users);
	});
});

router.get('/ping', function(req, res){
  res.send("pong!", 200);
});



module.exports = router;
