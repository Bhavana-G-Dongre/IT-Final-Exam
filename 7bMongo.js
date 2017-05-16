var express=require('express')
var bodyParser=require('body-parser')
var ejs=require('ejs')
var MongoClient=require('mongodb').MongoClient;
var app=express()
var urlencodedParser=bodyParser.urlencoded({extended:false})
MongoClient.connect("mongodb://127.0.0.1/FinalYears",function(err,db){
	if(!err)
	{
		console.log("Connected!!");
		app.get('/',function(req,res){
			res.send("<h1>Welcome to Final Years' Database</h1>");
		})
		app.get('/7bIndex.html',function(req,res){
			res.sendFile(__dirname+"/"+"7bIndex.html")
		})
		app.get('/process_get',function(req,res){
			
			var newRec = req.query
			console.log(newRec);
			db.collection('Student').insert(newRec, function(err, doc) {
    				if (err) 
				{
      					console.log("Failed to create new data.");
    				} 
				else 
				{
		 		res.status(201).json(doc.ops[1]);
    				}
			})
			console.log("Sent data are (GET):USN:"+req.query.usn+" Name:"+req.query.name+" Company name:"+req.query.cname)
			res.send('USN='+req.query['usn']+"<br>Name="+req.query['name']+"<br>Company name="+req.query['cname'])
		})
		
		app.get('/display',function(req,res){
			db.collection('Student').find({},{_id:0}).toArray(function(err,docs){
				res.status(200).json(docs)
			})
		})
		
		app.get('/search',function(req,res){
			
			db.collection('Student').find({cname:'infosys'},{_id:0}).toArray(function(err, docs) {
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
		
		app.get('/count',function(req,res){

			db.collection('Student').count({cname:"infosys"},function(err,count){
					res.send("Number of students selected for Infosys is "+count)
				})
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