var express=require('express');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
var app=express();
var expressValidator=require('express-validator');
app.use(expressValidator());

app.get('/',function(req,res)
{
	res.send("<h1>Welcome</h1>");
})

app.get('/6bIndex.html',function(req,res)
{
	res.sendFile(__dirname+"/"+"6bIndex.html");
})

app.post('/process_post',urlencodedParser,function(req,res)
{

	req.checkBody('name','Name must a non-empty set of letters').isAlpha().notEmpty();
	req.checkBody('marks','Marks must be a non-empty integer').isInt().notEmpty();
	var errors=req.validationErrors();
	if(errors)
	{
		res.send(errors);
		return;
	}
	else
	{
		console.log("No errors! Name:"+req.body.name+" USN :"+req.body.usn+" Branch :"+req.body.branch+" Marks :"+req.body.marks);
	}
})
var server=app.listen(5000,function()
{
var host=server.address().address;
var port=server.address().port;
console.log("Listening at http:// %s %s",host,port);
})