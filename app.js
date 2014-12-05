var express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./routes/index'),
    models = require('./models');

var app = express();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	  console.log('mongoose: all good');
});

app.get('/users', function(req, res) {
	mongoose.model('users').find(function(err, users){
		res.send(users);
	})});

app.listen(8000);
