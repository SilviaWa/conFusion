var express = require('express');
var bodyParser=require('body-parser');

var Promo = require('../models/promotions');
var Verify = require('./verify');

module.exports = (function(){

'use strict';

    var promoRouter=express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.get(function(req,res,next){
    Promo.find(req.query, function(err,promo){
        if(err) next(err);
        res.json(promo);
    });
})

.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
    Promo.create(req.body, function (err,promo){
        if(err) next(err);

        console.log('Promotion created!');
        var id = promo._id;
        res.writeHead(200, {
            'Content-Type':'text/plain'
        });

        res.end('Added the promotion with id: '+id);
     });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
        Promo.remove({},function  (err,resp){
        if(err) next(err);
        res.json(resp);
    });
});

promoRouter.route('/:promoId')

.get(function(req,res,next){
        Promo.findById(req.params.promoId, function(err, promo){
        if(err) next(err);
        res.json(promo);
    })
})

.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
        Promo.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{
        new: true
    }, function(err,promo){
        if(err) next(err);
        res.json(promo);
    });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
        Promo.remove(req.params.promoId, function(err,resp){
        if(err) next(err);
        res.json(resp);
    });
});

return promoRouter;

})();

