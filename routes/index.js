var express = require('express'),
    router = express.Router();

router.get('/', function(req, res){
	res.status(200).send({title: 'Welcome'})});
//res.render('indexTemplate', {});

module.exports = router;
