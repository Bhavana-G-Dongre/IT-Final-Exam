var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var urlencodedParser=bodyParser.urlencoded({extended:false})
app.get('/',function(req,res){
	res.send('Welcome');
})
app.get('/9bIndex.html',function(req,res){
	res.sendFile(__dirname+"/"+"9bIndex.html");
})
app.get('/welcome',function(req,res){
	res.send('<h1>Welcome to BGD Travels</h1>');
})
app.get('/Karnataka',function(req,res){
	res.send('<body bgcolor="#0000FF">Tourist places in Karnataka:<br> Mysore Palace<br>Lalbagh Garden<br>Bandipur National Park<br></body>');
})
app.get('/Delhi',function(req,res){
	res.send('<body bgcolor="#00FF00">Tourist places in Delhi:<br> Red Fort<br>Lotus Temple<br>India Gate<br></body>');
})
app.get('/Rajasthan',function(req,res){
	res.send('<body bgcolor="#FF0000"> Tourist places in Rajasthan:<br> Thar Desert<br>Sheesh Mahal<br>Amber Fort<br></body>');
})

var server=app.listen(5000,function(){
var host=server.address().address
var port=server.address().port
console.log("Example app at %s %s",host,port);
})