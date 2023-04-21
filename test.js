var maxInt = 100;
var minInt = -100;
var randomInt = Math.floor ( Math.random() * (maxInt + 1 - minInt) ) + minInt ;
if(randomInt < 0){
  randomInt = "(" + randomInt + ")";
};
console.log(randomInt);