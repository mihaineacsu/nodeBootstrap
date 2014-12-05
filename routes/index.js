var express = require('express'),
    router = express.Router();

router.get('/', function(req, res){
	// res.status(200).send({title: 'Welcome'})});
	res.render('index', {'title': 'Welcome to nodeBootstrap'});
});

module.exports = router;
