var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var routeSchema = new Schema(
	{
		trip: Array
	},
	{
		collection: 'routes'
	}
);

var routeSchema = new Schema(
	{
		trip: Array
	},
	{
		collection: 'routes'
	}
);

var routes = mongoose.model('routes', routeSchema);

module.exports = routes;