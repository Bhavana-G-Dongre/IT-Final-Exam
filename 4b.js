var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:false})
app.get('/',function(req,res){
	console.log("Got get request");
	res.send('Welcome');
})
app.get('/4bIndex.html',function(req,res){
	res.sendFile(__dirname+"/"+"4bIndex.html");
})
app.get('/welcome',function(req,res){
	res.send('<h1>Welcome to Engineering</h1>');
})
app.get('/rvce',function(req,res){
	res.send('Branch details of RVCE:<br> Computer Science<br>Electronics and Communication<br>Information Science<br>');
})
app.get('/pesit',function(req,res){
	res.send('Branch details of PESIT:<br> Mechanical<br>Electricals and Electronics<br>Telecommunication<br>');
})
app.get('/bmsce',function(req,res){
	res.send('Branch details of BMSCE:<br> Medical Electronics<br>Instrumentation Technology<br>Computer Science<br>');
})
app.get('/msrit',function(req,res){
	res.send('Branch details of MSRIT:<br> Computer Science<br>Biotechnology<br>Chemical Engineering<br>');
})
app.get('/bit',function(req,res){
	res.send('Branch details of BIT:<br> Mechanical<br>Civil<br>Industrial Management<br>');
})
var server=app.listen(5000,function(){
var host=server.address().address
var port=server.address().port
console.log("Example app at %s %s",host,port);
})