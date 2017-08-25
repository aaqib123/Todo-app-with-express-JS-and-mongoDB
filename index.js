var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var app = express();
MongoClient.connect('mongodb://todo:asdf@ds159493.mlab.com:59493/todo',function(err, database){
	if (err) return console.log(err);
	db = database;
	//start  server
	app.listen(3000,function(){
	console.log('server listening');	
})
})

app.use(function(req, res, next){
   console.log("A new request received at " + Date.now());   
   next();
});
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res){
	db.collection('quotes').find().toArray(function(err, results) {
	if (err) {return console.log(err);}
    else {res.render('index.ejs', {quotes: results})}
	})
})

app.post('/quotes',function(req,res){
		db.collection('quotes').save(req.body,function(err,result){
		if (err){
			return console.log(err);			
		}		
		else {
			console.log('saved to database');
			res.redirect('/');	
		}
		})
	console.log(req.body)
})