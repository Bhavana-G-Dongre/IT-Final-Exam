function palindrome(num)
{
	sum=0
	temp=num
	while(num>0)
	{
		r=num%10
		sum=(sum*10)+r
		num=parseInt(num/10)
	}
	if(temp==sum)
	return 1
	else
	return 0
}
module.exports.palindrome=palindrome