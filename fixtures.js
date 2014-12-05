var mongoose = require('mongoose'),
	models = require('./models');


mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('mongoose: all good');
});

//load up test data for db
new models({username: 'Mihai', password: 'somePassword'}).save(function (err) {
  if (err) return console.error(err);
});
new models({username: 'Andrei', password: 'someBetterPassword'}).save(function (err) {
  if (err) return console.error(err);
});
new models({username: 'Ana', password: 'noPassword'}).save(function (err) {
  if (err) return console.error(err);
  console.log('Fixtures installed; you should be set, ctrl+c to exit');
});
