function double(argument) {
	return (argument*2);
}
function double(argument,argument2) {
	return (argument*2);
}
const a = [0,1,2,3];
const doubleOfA = a.map(double());
/*a.forEach(function(d,i){
	doubleOfA[i] = double(d);
});*/


console.log(doubleOfA);




