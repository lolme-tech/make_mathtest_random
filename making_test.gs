//clasp openでGASを起動
//clasp pushでgoogleにコードをアップロード

//まずは整数同士の+-*%演算を実行するプログラムの作成
function myFunction() {
  //指定のドキュメントを開く
  //var body = DocumentApp.openByUrl("//新しいドキュメントのURLを入れる");
  //ドキュメントを白紙にする
  //body.clear();
  //var paragraphs = DocumentApp.getActiveDocument().getBody().getParagraphs();
  console.log(createLargeInteger(1,100));
  //var p1 = paragraphs[0]
  //段落にテキストを挿入する。
  //p1.insertText( 0, "1+1=" );no
  body.appendParagraph("2+1=")
  for(var i=0;i<=3;i++)
  {
    body.appendParagraph("");
  }  
  body.appendParagraph("1+1=")
  //p1.editAsText().setFontSize(20);
  paragraphs[0].editAsText().setFontSize(20);

}

//ランダムな大きな整数を作成する関数
//---------------------関数の説明-------------------------
//最小値minIntと最大値maxIntを与えると最小値からその最大値までの間のランダムな整数を返す
//例えば1と100を与えると35などの値を返す(1 <= randomInt <= 100)
//-------------------------------------------------------
function createLargeInteger(minInt , maxInt){
  var randomInt = Math.floor ( Math.random() * (maxInt + 1 - minInt) ) + minInt ;
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
