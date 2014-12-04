var express = require('express')

var app = express();
app.get('/', function(req, res) {
	res.status('home').send({title: 'Welcome'})});

app.listen(8000);
