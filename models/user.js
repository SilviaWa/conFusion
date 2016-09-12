var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongooes = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken:String,
    firstname: {
    	type: String,
    	default: ''
    },
    lastname: {
    	type: String,
    	default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },


});

User.methods.getName = function(){
	return (this.firstname + ' ' + this.lastname)
};

User.plugin(passportLocalMongooes);


//create a model to use the schema
module.exports = mongoose.model('User',User); 