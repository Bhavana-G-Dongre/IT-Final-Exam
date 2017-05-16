function arms(num)
{
	arm=0
	temp=num;
	while(temp>0)
	{
		a=temp%10;
		temp=parseInt(temp/10); // convert float into Integer
		arm=arm+a*a*a;
	}
	if(arm==num)
	{
		return 1
	}
	else
	{
		return 0
	}
}
module.exports.arms=arms