var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Dish'
    }]
}, {
    timestamps: true
});

//create a model to use the schema
var Favorites = mongoose.model('Favorite',favoriteSchema);

module.exports = Favorites;