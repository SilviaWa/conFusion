var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


//create a schema
var leaderSchema = new Schema({
	name:{
		type: String,
		require: true,
		unique: true
	},
	image:{
		type: String,
		required: true
	},
	designation: {
		type: String,
		default: true
	},
	featured: {
        type:Boolean,
        default:false
    },
	abbr: {
		type: String,
		required: true
	},
	description: {
		type: String,
		require: true
	}
}, {
	timestamps: true
});


//create a model to use the schema
var Leaders = mongoose.model('Leader',leaderSchema);

module.exports = Leaders;