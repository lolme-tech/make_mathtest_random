//clasp openでGASを起動
//clasp pushでgoogleにコードをアップロード

//まずは整数同士の+-*%演算を実行するプログラムの作成

//作成するテストの問題を変更させる際は
//---------------------ここから----------------------------
//整数だけの演算テストを作成する際はこちらを変更
var minInteger = -100;
var maxInteger = 100;
//--------------ここまでの変数を変更する--------------------

function myFunction() {
  var body = DocumentApp.openByUrl("https://docs.google.com/document/d/1GLBoZMo5KZgVe8MVfi1GO_yS90nv4jgl799gnr-x37w/edit");
  body.clear();
  var paragraphs = body.getParagraphs();
  var p0 = paragraphs[0];
  p0.insertText(0 , " 次を計算をしてください \n").setFontSize(15);
  for(let i = 1; i < 16; i++){
    body.appendParagraph("(" + i + ")  " + createInteger(minInteger , maxInteger) + " " + createOperater() + " " + createInteger(minInteger , maxInteger) + " = \n\n" ).setFontSize(18);
  };
}

//ランダムな整数を作成する関数
//---------------------関数の説明-------------------------
//最小値minIntと最大値maxIntを与えると最小値からその最大値までの間のランダムな整数を返す
//例えば1と100を与えると35などの値を返す(1 <= randomInt <= 100)
//※最小値にはマイナスの値も適応される
//-------------------------------------------------------
function createInteger(minInt , maxInt){
  var randomInt = Math.floor ( Math.random() * (maxInt + 1 - minInt) ) + minInt ;
  if(randomInt < 0){
    randomInt = "( " + randomInt + " )";
  };
  return randomInt ;
}

//ランダムな演算子を返す関数
//---------------------関数の説明-------------------------
//+-×÷の4つの演算子の中からランダムで1つ返す
//-------------------------------------------------------
function createOperater(){
  var operater = ["+" , "-" , "×" , "÷"] ;
  var randomInt = Math.floor ( Math.random() * (3 + 1 - 0) ) + 0 ;
  return operater[randomInt] ;
}

//ランダムな小数点を作成する関数
//---------------------関数の説明-------------------------
//最小値minDeciと最大値maxDeciを与えると最小値から最大値までの間のランダムな小数を返す
//例えば0.1と100.0を与えると35.3などの値を返す
//-------------------------------------------------------
// function createLargeInteger(maxInt){
//   return randomInt ;
// }

//ランダムな分数を作成する関数
//解答を作成する関数
