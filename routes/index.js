var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    Account = require('../models'),
    Routes = require('../models/routes.js')
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

router.get('/build', function(req, res) {
	if (req.isAuthenticated())
		redirect('/');

	var toReturn;
	var link;
	if (req.user){
		toReturn = req.user.username;
		link = '/users/' + req.user.username;
	}
	else
		;

	res.render('./build', {'user': toReturn, 'userLink': link});
})

router.get('/ping', function(req, res){
  res.send("pong!", 200);
});

router.post('/storeRoute', function(req, res){
	if (req.isAuthenticated())
		redirect('/');

	var toSave = req.body['data'];
	var newRoute = new Routes({trip: toSave}).save(function (err) {
		if (err) return console.error(err);
	});
	res.send('go');
});	

router.get('/read/:id', function(req, res){
	mongoose.model('routes').findOne({_id: req.params.id}, function(err, foundRoute){
		var points = [];
		var result = [];
		if(foundRoute['trip'] !== 'undefined')
		for(var i = 0; i < foundRoute['trip'].length; i++) {
			points[0] = foundRoute['trip'][i]['checkpoint'][0];
			points[1] = foundRoute['trip'][i]['checkpoint'][1];
			points[2] = foundRoute['trip'][i]['experience'];
			//points[3] = foundRoute['trip'][i]['desc'];
			result.push(points);
		}
		res.render('read', {trip: result});
	})
});



module.exports = router;
