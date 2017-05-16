function auto(n)
{
    	sq = n*n; 
    	num = n.toString();
    	square = sq.toString(); 
    	if(square.endsWith(num)) 
       		return 1
    	else
        	return 0
}
module.exports.auto=auto