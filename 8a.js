var express=require('express');
var app=express();
var requestTime=function(req,res,next) {
	var dt = new Date();
	var utcDate = dt.toUTCString();
	req.requestTime=utcDate;
	next();
}
app.use(requestTime);
app.get('/',function(req,res) {
	res.send('<h1>Welcome</h1>');
	console.log("TimeStamp is "+req.requestTime);
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log("URL is "+fullUrl);
})

app.get('/8aIndex.html',function(req,res) {
	console.log("TimeStamp is "+req.requestTime);
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log("URL is "+fullUrl);
	res.sendFile(__dirname+"/"+"8aIndex.html");
})

app.get('/view',function(req,res)
{
console.log("TimeStamp is "+req.requestTime);
var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
console.log("URL is "+fullUrl);
res.send("Inside View");
})

app.listen(5000);