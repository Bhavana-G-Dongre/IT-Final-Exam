var express=require('express')
var bodyParser=require('body-parser')
var ejs=require('ejs')
var MongoClient=require('mongodb').MongoClient;
var app=express()
var urlencodedParser=bodyParser.urlencoded({extended:false})
MongoClient.connect("mongodb://127.0.0.1/College",function(err,db){
	if(!err)
	{
		console.log("Connected!!");
		app.get('/',function(req,res){
			res.send("<h1>Welcome to College Database</h1>");
		})
		app.get('/10bIndex.html',function(req,res){
			res.sendFile(__dirname+"/"+"10bIndex.html")
		})
		app.get('/process_get',function(req,res){
			
			var newRec = req.query
			console.log(newRec);
			db.collection('Department').insert(newRec, function(err, doc) {
    				if (err) 
				{
      					console.log("Failed to create new data.");
    				} 
				else 
				{
		 		res.status(201).json(doc.ops[1]);
    				}
			})
			console.log("Sent data are (GET):ID:"+req.query.id+" Title:"+req.query.title+" Name:"+req.query.name+" Branch:"+req.query.branch)
			res.send('ID='+req.query['id']+"<br>Title="+req.query['title']+"<br>Name="+req.query['name']+"<br>Branch="+req.query['branch'])
		})
		
		app.get('/display',function(req,res){
			db.collection('Department').find({},{_id:0}).toArray(function(err,docs){
				res.status(200).json(docs)
			})
		})
		
		app.get('/search',function(req,res){
			
			db.collection('Department').find({branch:'cse',title:'professor'},{_id:0}).toArray(function(err, docs) {
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