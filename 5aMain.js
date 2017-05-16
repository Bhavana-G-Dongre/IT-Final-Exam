f=require('./5aFibonacci.js')
a=require('./5aArmstrong.js')
f1=6
a1=371
console.log(f1+"th Fibonacci number="+f.fibo(f1))
if(a.arms(a1))
console.log(a1+" is an Armstrong number")
else
console.log(a1+" is not an Armstrong number")
