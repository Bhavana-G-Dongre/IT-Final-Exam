var express=require('express')
var bodyParser=require('body-parser')
var ejs=require('ejs')
var MongoClient=require('mongodb').MongoClient;
var app=express()
var urlencodedParser=bodyParser.urlencoded({extended:false})
MongoClient.connect("mongodb://127.0.0.1/Movies",function(err,db){
	if(!err)
	{
		console.log("Connected!!");
		app.get('/',function(req,res){
			res.send("<h1>Welcome to Movies Database</h1>");
		})
		app.get('/3bIndex.html',function(req,res){
			res.sendFile(__dirname+"/"+"3bIndex.html")
		})
		app.get('/process_get',function(req,res){
			
			var name1=req.query.name
			var budget1=parseInt(req.query.budget)
			var hero1=req.query.hero
			var heroine1=req.query.heroine
			var newRec = req.query
			console.log(newRec);
			db.collection('HindiFilms').insert({name:name1,budget:budget1,hero:hero1,heroine:heroine1}, function(err, doc) {
    				if (err) 
				{
      					console.log("Failed to create new data.");
    				} 
				else 
				{
		 		res.status(201).json(doc.ops[1]);
    				}
			})
			console.log("Sent data are (GET):Name:"+req.query.name+" Budget:"+req.query.budget+" Hero:"+req.query.hero+" Heroine:"+req.query.heroine)
			res.send('Name='+req.query['name']+"<br>Budget="+req.query['budget']+"<br>Hero="+req.query['hero']+"<br>Heroine="+req.query['heroine'])
		})
		
		app.get('/display',function(req,res){
			db.collection('HindiFilms').find({},{_id:0}).toArray(function(err,docs){
				res.status(200).json(docs)
			})
		})
		
		app.get('/search',function(req,res){
			
			db.collection('HindiFilms').find({budget:{$gt:5000000}},{_id:0}).toArray(function(err, docs) {
    				if (err) 
				{
      					console.log(err.message+ "Failed to get data.");
    				} 
				else 
				{
      					res.status(200).json(docs);
    				}
  			});
		})
		
		var server=app.listen(5000,function(){
			var host=server.address().address
			var port=server.address().port
			console.log("Host %s Port %s",host,port)
		})
	}
	else
	{
		db.close()
	}
})