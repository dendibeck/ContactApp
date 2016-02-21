var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var config = require('./config');
// var contacts = require('./models/contacts')
var db = mongojs('contactlist', ['contacts']);




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
	db.contacts.find(function(err, docs){
		res.json(docs);
	});
});

app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contacts.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id=req.params.id;
	console.log(id);
	db.contacts.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contacts.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, 
						email: req.body.email,
						number: req.body.number
					}},
		new: true}, function(err, doc){
			res.json(doc);
	});
});

app.listen(3000);
console.log("server running on port 3000");