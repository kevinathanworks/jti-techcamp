const express = require('express');
const router = express.Router();
const mongo = require('mongojs');
const db = mongo('mongodb+srv://techcampuser:123tech@techcamp.q7t5bty.mongodb.net/tech-camp', ['todo']);

router.get('/', function(req, res, next){

    db.todo
    .find({},function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/', function(req, res, next){

    db.todo
    .find({},function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/', function(req, res, next){

    let query = {};
    if (req.query.text) query.text = req.query.text;
    if (req.query.isCompleted) {
        if (req.query.isCompleted === 'true') query.isCompleted = true;
        else query.isCompleted = false;
    }

    db.todo
    .find(query,function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/:id', function(req, res, next){

    let query = {
        _id: db.ObjectId(req.params.id)
    };

    db.todo
    .findOne(query, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.post('/', function(req, res, next){

    let todos = req.body;

    if(!todos.text || !(todos.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todo
        .save(todos, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });

    }
});

router.put('/:id', function(req, res, next){

    let todos = req.body;

    if(!todos.text || !(todos.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todos
        .replaceOne({
            _id: db.ObjectId(req.params.id)
        }, todos, {}, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });

    }
});

router.delete('/:id', function(req, res, next){ {
    db.todos
        .remove({
            _id: db.ObjectId(req.params.id)
        }, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });

    }
});


module.exports = router;