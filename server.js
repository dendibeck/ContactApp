var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var config = require('./config');
// var contact = require('./models/contact')
var db = mongojs('contactlist', ['contactlist']);




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("connected to the database");
	}
});

app.get('/contactlist', function(req, res){
	console.log("I receive a GET request");
	db.contactlist.find(function(err, docs){
		res.json(docs);
	});
});

app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id=req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, 
						position: req.body.position,
						number: req.body.number
					}},
		new: true}, function(err, doc){
			res.json(doc);
	});
});

app.listen(3000);
console.log("server running on port 3000");