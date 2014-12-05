var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// local users will rely on 'username', 'password' and 'local' fields; their local field will be True
// social users will rely on 'username', 'oauthID' and 'local' fields; their local field will be False 
var userSchema = new Schema(
	{
		username: String,
	    password: String,
	    oauthID: Number,
	    local: Boolean
	},
	{
		collection: 'users'
	}
);

var users = mongoose.model('users', userSchema);

module.exports = users;