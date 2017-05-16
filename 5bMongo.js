var express=require('express')
var bodyParser=require('body-parser')
var ejs=require('ejs')
var MongoClient=require('mongodb').MongoClient;
var app=express()
var urlencodedParser=bodyParser.urlencoded({extended:false})
MongoClient.connect("mongodb://127.0.0.1/library",function(err,db){
	if(!err)
	{
		console.log("Connected!!");
		app.get('/',function(req,res){
			res.send("<h1>Welcome to Library Database</h1>");
		})
		app.get('/5bIndex.html',function(req,res){
			res.sendFile(__dirname+"/"+"5bIndex.html")
		})
		app.get('/process_get',function(req,res){
	
			var newRec = req.query
			console.log(newRec);
			db.collection('books').insert(newRec, function(err, doc) {
    				if (err) 
				{
      					console.log("Failed to create new data.");
    				} 
				else 
				{
		 		res.status(201).json(doc.ops[1]);
    				}
			})
			console.log("Sent data are (GET):Name:"+req.query.name+" Title:"+req.query.title+" Author:"+req.query.author+" Subject:"+req.query.subject+" Year:"+req.query.year)
			res.send('Name='+req.query['name']+"<br>Title="+req.query['title']+"<br>Author="+req.query['author']+"<br>Subject="+req.query['subject']+"<br>Year="+req.query['year'])
		})
		
		app.get('/display',function(req,res){
			db.collection('books').find({},{_id:0}).toArray(function(err,docs){
				res.status(200).json(docs)
			})
		})
		app.get("/delete", function(req, res) {

    			db.collection('books', function (err, data) {
       				data.remove({subject:{$ne:'cse'}},function(err, result) {
					if (err) 
					{
						console.log("Failed to update data.");
					} 
					else 
					{
						res.send(result);
					}
        			});
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