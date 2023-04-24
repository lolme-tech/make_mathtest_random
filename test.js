console.log(-68%97);
function answerQuestion(clause1, operater, clause2){
  switch(operater){
    case "+":
      return clause1 + clause2;
    case "-":
      return clause1 - clause2;
    case "×":
      return clause1 * clause2;
    case "÷":
      var division =  Math.floor(clause1 / clause2);
      var remainder = clause1 % clause2;
      return division + " 余り " + remainder;
    default:
      break;
  }
}

function createOperater(){
  var operater = ["+" , "-" , "×" , "÷"] ;
  var randomInt = Math.floor ( Math.random() * (3 + 1 - 0) ) + 0 ;
  return operater[randomInt] ;
}
function answerQuestion(clause1, operater, clause2){
  switch(operater){
    case "+":
      return clause1 + clause2;
    case "-":
      return clause1 - clause2;
    case "×":
      return clause1 * clause2;
    case "÷":
      if (clause1 < 0){
        clause1 = clause1 * -1;
      }else if(clause2 < 0){
        clause2 = clause2 * -1;
      }
      var division =  clause1 / clause2 | 0;
      var remainder = clause1 % clause2;
      return division + " 余り " + remainder;
    default:
      break;
  }
}