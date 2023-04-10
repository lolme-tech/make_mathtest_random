//clasp open(close)でGASの環境開始
function myFunction() {
  //指定のドキュメントを開く
  var body = DocumentApp.openByUrl("//新しいドキュメントのURLを入れる");
  body.clear();
  var paragraphs = DocumentApp.getActiveDocument().getBody().getParagraphs();
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
//ランダムな整数を作成する関数
function createRandomIntegerValue(){

}
//ランダムな大きな整数を作成する関数
//ランダムな小数点を作成する関数
//ランダムな分数を作成する関数
//解答を作成する関数
