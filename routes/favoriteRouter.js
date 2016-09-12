var express = require('express');
var bodyParser=require('body-parser');
var mongoose = require('mongoose');
var Favorites = require('../models/favorites');
var Verify = require('./verify');
var favoriteRouter = express.Router();

favoriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)

.get(function(req,res,next){

    Favorites.findOne({postedBy:req.decoded._id})
        .populate('postedBy')
        .populate('dishes')
        .exec(function(err,favorite){
            if(err) throw err;
            res.json(favorite);
        })
})

.post(function(req,res,next){

	Favorites.findOne({postedBy:req.decoded._id},function(err,favorite){
		if(!favorite){
			req.body.postedBy = req.decoded._id;
			req.body.dishes= [req.body._id];
			Favorites.create(req.body, function (err,favorite){
        		if(err) throw err;

        		console.log('Favorites created!');

        		res.json(favorite);
     		});

		} else {

			favorite.dishes.push(req.body._id);

			favorite.save(function(err, favorite){
            	if(err) throw err;
            	console.log('Updated favorites');

            	res.json(favorite);
        	});
		}
	});
})

.delete(function(req,res,next){
	Favorites.findOne({postedBy:req.decoded._id},function(err,favorite){
		if (err) throw err;
		favorite.remove();

		console.log('Removed all Favorites');
		res.json(favorite);

	});
});

favoriteRouter.route('/:favorId')
.delete(Verify.verifyOrdinaryUser, function(req,res,next){
		Favorites.findOneAndUpdate({postedBy:req.decoded._id},{$pullAll:{dishes:[req.params.favorId]}},{new:true},
			function(err,favorite){
				if(err) throw err;

				console.log('Favorite deleted');
				res.json(favorite);
		});

	
});

module.exports = favoriteRouter;