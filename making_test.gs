//開発時用のコメント
//(1)clasp openでGASを起動
//(2)clasp pushでgoogleにソースコードをアップロード

//作成するテストの問題を変更させる際はここから-----------------
//整数同士の演算の問題であれば1を、
//～～～であれば2を、
//～～～であれば3を、
var selectProblem = 1
//整数だけの演算テストを作成する際はこちらを変更
var minInteger = -100;
var maxInteger = 100;
//------------------------------------ここまでの変数を変更する

function myFunction() {
  switch(selectProblem){
    case 1:
      IntegerProblem();
    //現在作成中
    case 2:
      break;
    default:
      break;
  }
}

//整数同士の演算をする問題を作成する関数
function IntegerProblem(){
  var body = DocumentApp.openByUrl("https://docs.google.com/document/d/1GLBoZMo5KZgVe8MVfi1GO_yS90nv4jgl799gnr-x37w/edit");
  var clause1 = [] ;
  var clause2 = [] ;
  var operater = [] ;
  body.clear();
  var paragraphs = body.getParagraphs();
  var p0 = paragraphs[0];
  p0.insertText(0 , " 次を計算をしてください \n").setFontSize(15);
  for(let i = 0; i < 15; i++){
    clause1.push(createInteger(minInteger , maxInteger));
    clause2.push(createInteger(minInteger , maxInteger));
    operater.push(createOperater());
    body.appendParagraph( "(" + ( i + 1 ) + ")  " +  addBrackets(clause1[i]) + " " + operater[i] + " " + addBrackets(clause2[i]) + " = \n\n").setFontSize(18);
  };
  body.appendPageBreak();
  for(let i = 0; i <15; i++){
    body.appendParagraph( "(" + ( i + 1 ) + ")  " +  addBrackets(clause1[i]) + " " + operater[i] + " " + addBrackets(clause2[i]) + " = " + answerQuestion(clause1[i], operater[i], clause2[i])).setFontSize(15);
  };
}
//ランダムな整数を作成する関数
//------------------------------------関数の説明----------------------------------------------
//最小値minIntと最大値maxIntを与えると最小値からその最大値までの間のランダムな整数を返す
//例えば1と100を与えると35などの値を返す(1 <= randomInt <= 100)
//※最小値にはマイナスの値も適応できる
//-------------------------------------------------------------------------------------------
function createInteger(minInt , maxInt){
  var randomInt = Math.floor ( Math.random() * (maxInt + 1 - minInt) ) + minInt ;
  return randomInt ;
}

//ランダムな演算子を返す関数
//---------------------関数の説明-------------------------
//+, -, ×, ÷ の演算子の中からランダムで1つ返す
//-------------------------------------------------------
function createOperater(){
  var operater = ["+" , "-" , "×" , "÷"] ;
  var randomInt = Math.floor ( Math.random() * (3 + 1 - 0) ) + 0 ;
  return operater[randomInt] ;
}

//渡された数値と文字式を数式に変換して計算したものを返す関数
//---------------------関数の説明---------------------------------
//ランダムで生成された問題3×2を3*2に変換して答えである6を返す
//割り算であれば商と余りを返す
//例えば10, ÷, 3を与えると3余り1返し、3, ×, 3を与えると9を返す
//---------------------------------------------------------------
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
        clause1 = clause1 * (-1);
      }else if(clause2 < 0){
        clause2 = clause2 * (-1);
      }
      var division =  clause1 / clause2 | 0;
      var remainder = clause1 % clause2;
      return division + " 余り " + remainder;
    default:
      break;
  }
}

//渡された数値にマイナスがあればカッコをつけて返す関数
//---------------------関数の説明-------------------------
//例えば-100が渡されると文字列として( -100 )を返す
//-------------------------------------------------------
function addBrackets(value){
  if (value < 0) {
    return "( " + value + " )";
  }else{
    return value;
  }
}

//ランダムな小数点を作成する関数
//---------------------関数の説明--------------------------------------------------------
//最小値minDeciと最大値maxDeciを与えると最小値から最大値までの間のランダムな小数を返す
//例えば0.1と100.0を与えると35.3などの値を返す
//--------------------------------------------------------------------------------------
// function createLargeInteger(maxInt){
//   return randomInt ;
// }

//ランダムな分数を作成する関数
//解答を作成する関数
