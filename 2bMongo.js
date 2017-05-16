var express=require('express')
var bodyParser=require('body-parser')
var ejs=require('ejs')
var MongoClient=require('mongodb').MongoClient;
var app=express()
var urlencodedParser=bodyParser.urlencoded({extended:false})
MongoClient.connect("mongodb://127.0.0.1/gradedb",function(err,db){
	if(!err)
	{
		console.log("Connected!!");
		app.get('/',function(req,res){
			res.send("<h1>Welcome to Student Grades Database</h1>");
		})
		app.get('/2bIndex.html',function(req,res){
			res.sendFile(__dirname+"/"+"2bIndex.html")
		})
		app.get('/process_get',function(req,res){
			
			var newRec = req.query
			console.log(newRec);
			db.collection('grade').insert(newRec, function(err, doc) {
    				if (err) 
				{
      					console.log("Failed to create new data.");
    				} 
				else 
				{
		 		res.status(201).json(doc.ops[1]);
    				}
			})
			console.log("Sent data are (GET):USN:"+req.query.usn+" Name:"+req.query.name+" Dept:"+req.query.dept+" Grade:"+req.query.grade)
			res.send('USN='+req.query['usn']+"<br>Name="+req.query['name']+"<br>Dept="+req.query['dept']+"<br>Grade="+req.query['grade'])
		})
		
		app.get('/display',function(req,res){
			db.collection('grade').find({},{_id:0}).toArray(function(err,docs){
				res.status(200).json(docs)
			})
		})
	
		app.get('/2bUpdate.html',function(req,res){
			res.sendFile(__dirname+"/"+"2bUpdate.html")
		})
	
		app.get("/update", function(req, res) {
			var name1=req.query.name
			var grade1=req.query.grade;
    			db.collection('grade', function (err, data) {
       				data.update({name:name1},{$set:{grade:grade1}},{multi:true},function(err, result) {
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