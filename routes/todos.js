var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://ajayreddy_2211:Ajay2211@ds141490.mlab.com:41490/meantodosapp', [ 'todos' ]);

// to get all todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err, todos){
        if(err){
            res.send(err);
        } else{
            res.json(todos);
        }
    });
});

// to get a single todo
router.get('/todo/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo){
        if(err){
            res.send(err);
        } else{
            res.json(todo);
        }
    });
});

//save a todo
router.post('/todo',function(req, res, next){
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            'error': 'Invalid Data'
        });

    }else{
        db.todos.save(todo, function(err, result){
            if(err){
                res.send(err);
            } else{
                res.json(result);
            }
        });

    }

});

//Update a todo
router.put('/todo/:id',function(req, res, next){
    var todo = req.body;
    var updObj = {};
    if(todo.text){
        updObj.text = todo.text;
    }
    if(todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }    

    if(!updObj.text || !(updObj.isCompleted + '')){
        res.status(400);
        res.json({
            'error': 'Invalid Data'
        });

    }else{
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result){
            if(err){
                res.send(err);
            } else{
                res.json(result);
            }
        });

    }

});

//Delete a todo
router.delete('/todo/:id', function(req, res, next){
    db.todos.remove({
        _id : mongojs.ObjectId(req.params.id)
    }, '', function(err, result){
            if(err){
                res.send(err);
            } else{
                res.json(result);
            }
    });

});

module.exports = router;