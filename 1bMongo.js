var express=require('express')
var bodyParser=require('body-parser')
var ejs=require('ejs')
var MongoClient=require('mongodb').MongoClient;
var app=express()
var urlencodedParser=bodyParser.urlencoded({extended:false})
MongoClient.connect("mongodb://127.0.0.1/studentdb",function(err,db){
	if(!err)
	{
		console.log("Connected!!");
		app.get('/',function(req,res){
			res.send("<h1>Welcome to Student Marks Database</h1>");
		})
		app.get('/1bIndex.html',function(req,res){
			res.sendFile(__dirname+"/"+"1bIndex.html")
		})
		app.get('/process_get',function(req,res){
			var usn1=req.query.usn
			var name1=req.query.name
			var sub1=req.query.sub_code
			var cie1=parseInt(req.query.cie)
			var newRec = req.query
			console.log(newRec);
			db.collection('stud').insert({usn:usn1,name:name1,sub_code:sub1,cie:cie1}, function(err, doc) {
    				if (err) 
				{
      					console.log("Failed to create new data.");
    				} 
				else 
				{
		 		res.status(201).json(doc.ops[1]);
    				}
			})
			console.log("Sent data are (GET):USN:"+req.query.usn+" Name:"+req.query.name+" Subject code:"+req.query.sub_code+" CIE Marks:"+req.query.cie)
			res.send('USN='+req.query['usn']+"<br>Name="+req.query['name']+"<br>Subject Code="+req.query['sub_code']+"<br>CIE marks="+req.query['cie'])
		})
		
		app.get('/display',function(req,res){
			db.collection('stud').find({},{_id:0}).toArray(function(err,docs){
				res.status(200).json(docs)
			})
		})
		
		app.get('/search',function(req,res){
			
			db.collection('stud').find({cie:{$lt:20}},{_id:0,sub_code:0}).toArray(function(err, docs) {
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