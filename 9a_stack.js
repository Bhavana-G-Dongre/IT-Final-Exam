function stackOp(num)
{
	var stack=[]	
	for(i=0;i<num.length;i++)
	{
		stack.push(num[i])
		console.log("Number pushed into stack:"+num[i])
	}
	for(i=0;i<num.length;i++)
	{
		x=stack.pop()
		console.log("Number popped from stack:"+x)
	}
}
module.exports.stackOp=stackOp