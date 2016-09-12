var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


//create a schema
var promoSchema = new Schema({
	name:{
		type: String,
		require: true,
		unique: true
	},
	image:{
		type: String,
		required: true
	},
	label: {
		type: String,
		default: ""
	},
	featured: {
        type:Boolean,
        default:false
    },
	price: {
		type: Currency,
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
var Promotions = mongoose.model('Promotion',promoSchema);

module.exports = Promotions;