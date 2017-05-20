function queueOp(num)
{
	var queue=[]
	for(i=0;i<num.length;i++)
	{
		queue.push(num[i])
		console.log("Number added into queue:"+num[i])
	}
	for(i=0;i<num.length;i++)
	{
		x=queue.shift()
		console.log("Number deleted from queue:"+x)
	}
}
module.exports.queueOp=queueOp