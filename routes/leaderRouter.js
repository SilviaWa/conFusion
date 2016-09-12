var express = require('express');
var bodyParser=require('body-parser');

var Leader = require('../models/leadership');
var Verify = require('./verify');

module.exports = (function(){

'use strict';

    var leaderRouter=express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.get(function(req,res,next){
    Leader.find(req.query, function(err,leader){
        if(err) next(err);
        res.json(leader);
    });
})

.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
    Leader.create(req.body, function (err,leader){
        if(err) next(err);

        console.log('Leadership created!');
        var id = leader._id;
        res.writeHead(200, {
            'Content-Type':'text/plain'
        });

        res.end('Added the leadership with id: '+id);
     });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
        Leader.remove({},function  (err,resp){
        if(err) next(err);
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')

.get(function(req,res,next){
        Leader.findById(req.params.leaderId, function(err, leader){
        if(err) next(err);
        res.json(leader);
    })
})

.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
        Leader.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    },{
        new: true
    }, function(err,leader){
        if(err) next(err);
        res.json(leader);
    });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
        Leader.remove(req.params.leaderId, function(err,resp){
        if(err) next(err);
        res.json(resp);
    });
});

return leaderRouter;

})();

