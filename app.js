var config = require('config'),
    express = require('express'),
    mongoose = require('mongoose'),
    models = require('./models'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');


var app = express();

app.set('view options', { layout: false });
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.static(__dirname + '/public'));


// Need them for passport 
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser('your secret here'));
app.use(session({
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(models.authenticate()));
passport.serializeUser(models.serializeUser());
passport.deserializeUser(models.deserializeUser());

mongoose.connect(config.db);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
// 	  console.log('mongoose: all good');
// });

var routes = require('./routes/index');
app.use('/', routes);

app.get('/users', function(req, res) {
	mongoose.model('users').find(function(err, users){
		res.send(users);
	})});

console.log(config.port);
app.listen(config.port);
