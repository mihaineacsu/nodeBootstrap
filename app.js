var express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./routes/index'),
    models = require('./models');

var app = express();

app.set('port', (process.env.PORT || 8000))
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

mongoose.connect('mongodb://heroku_app32238551:k3r0oad4aiibfc4j872cds7agp@ds061200.mongolab.com:61200/heroku_app32238551')

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
// 	  console.log('mongoose: all good');
// });

app.get('/users', function(req, res) {
	mongoose.model('users').find(function(err, users){
		res.send(users);
	})});
console.log(app.get('port'));
app.listen(app.get('port'));
