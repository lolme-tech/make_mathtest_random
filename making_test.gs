//開発時用のコメント
//(1)clasp openでGASを起動
//(2)clasp pushでgoogleにソースコードをアップロード

//作成するテストの問題を変更させる際はここから-----------------
//整数同士の演算の問題であれば1を、
//～～～であれば2を、
//～～～であれば3を、
const selectProblem = 1
//整数だけの演算テストを作成する際はこちらを変更
const minInteger = -100;
const maxInteger = 100;
const clause1 = [] ;
const clause2 = [] ;
const operater = [] ;
//------------------------------------ここまでの変数を変更する
//ドキュメントIDの指定
const openDocumentId = '1GLBoZMo5KZgVe8MVfi1GO_yS90nv4jgl799gnr-x37w'

function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('メニュー')
    .addItem('問題作成', 'myFunction')
    .addItem('整数問題', 'createIntegerTable')
    .addItem('小数問題', 'createDecimalTable')
    .addItem('分数問題(開発中)', 'createFractionTable')
    .addToUi();
}

//整数問題作成の関数
function createIntegerTable() {
    //表データ（配列）
    const rowsData = [['問題割り当て(この行はいじらないでください)', '1'], 
    ['最大値⇒生成する問題の最大値を決定してください', '100'],
    ['最小値⇒生成する問題の最小値を決定してください', '-100'],
    ['', ''],
    ];
    const targetDoc = DocumentApp.openById(openDocumentId);
    targetDoc.clear();
    let body = targetDoc.getBody();
    //表の作成
    body.appendTable(rowsData);
  }
  
  //小数問題作成の関数
  function createDecimalTable() {
    //表データ（配列）
    const rowsData = [['問題割り当て(この行はいじらないでください)', '2'], 
    ['最大値⇒生成する問題の最大値を決定してください', '100'],
    ['最小値⇒生成する問題の最小値を決定してください', '-100'],
    ['小数部分の桁数⇒小数部分を何桁にするか決定してください', '2'],
    ];
    const targetDoc = DocumentApp.openById(openDocumentId);
    targetDoc.clear();
    let body = targetDoc.getBody();
    //表の作成
    body.appendTable(rowsData);
  }

function myFunction() {
    //問題作成の関数
    const targetDoc = DocumentApp.openById(openDocumentId);
    const targetTable = targetDoc.getBody().getTables()[0]
    const sort = Number(targetTable.getRow(0).getCell(1).getText());
    const digit = Number(targetTable.getRow(3).getCell(1).getText());
    const problemRange = { minInt: Number(targetTable.getRow(1).getCell(1).getText()), maxInt: Number(targetTable.getRow(2).getCell(1).getText())}
    createProblem(sort, problemRange, digit);

}

//整数同士の演算をする問題を作成する関数
function createIntegerProblem(){
  const targetDoc = DocumentApp.openById(openDocumentId);
  targetDoc.clear();
  const paragraphs = targetDoc.getParagraphs();
  const p0 = paragraphs[0];
  p0.insertText(0 , " 次を計算をしてください \n").setFontSize(15);
  p0.insertText(1 , "名前:").setFontSize(20);
  for(let i = 0; i < 15; i++){
    clause1.push(createInteger(minInteger , maxInteger));
    clause2.push(createInteger(minInteger , maxInteger));
    operater.push(createOperater());
    targetDoc.appendParagraph( "(" + ( i + 1 ) + ")  " +  addBrackets(clause1[i]) + " " + operater[i] + " " + addBrackets(clause2[i]) + " = \n\n").setFontSize(18);
  };
  targetDoc.appendPageBreak();
  for(let i = 0; i < 15; i++){
    targetDoc.appendParagraph( "(" + ( i + 1 ) + ")  " +  addBrackets(clause1[i]) + " " + operater[i] + " " + addBrackets(clause2[i]) + " = " + answerQuestion(clause1[i], operater[i], clause2[i])).setFontSize(15);
  };
}

//小数の問題を作るメソッド
function createDecimalProblem(problemRange, digit){
    const targetDoc = DocumentApp.openById(openDocumentId);
    targetDoc.clear();
    const paragraphs = targetDoc.getParagraphs();
    const p0 = paragraphs[0];
    p0.insertText(0 , " 次を計算をしてください \n 名前:").setFontSize(15);
    p0.insertText(1 , "名前:").setFontSize(20);
    for(let i = 0; i < 15; i++){
        clause1.push(createDecimal((Math.random() * (problemRange.maxInt + 1 - problemRange.minInt) + problemRange.minInt), digit));
        clause2.push(createDecimal((Math.random() * (problemRange.maxInt + 1 - problemRange.minInt) + problemRange.minInt), digit));
        operater.push(createOperater());
        targetDoc.appendParagraph( "(" + ( i + 1 ) + ")  " +  addBrackets(clause1[i]) + " " + operater[i] + " " + addBrackets(clause2[i]) + " = \n\n").setFontSize(18);
    };
    targetDoc.appendPageBreak();
    for(let i = 0; i < 15; i++){
        targetDoc.appendParagraph( "(" + ( i + 1 ) + ")  " +  addBrackets(clause1[i]) + " " + operater[i] + " " + addBrackets(clause2[i]) + " = " + answerQuestion(clause1[i], operater[i], clause2[i])).setFontSize(15);
    };
  }


//ランダムな整数を作成する関数
//------------------------------------関数の説明----------------------------------------------
//最小値minIntと最大値maxIntを与えると最小値からその最大値までの間のランダムな整数を返す
//例えば1と100を与えると35などの値を返す(1 <= randomInt <= 100)
//※最小値にはマイナスの値も適応できる
//-------------------------------------------------------------------------------------------
function createInteger(minInt , maxInt){
  const randomInt = Math.floor ( Math.random() * (maxInt + 1 - minInt) ) + minInt ;
  return randomInt ;
}

//ランダムな演算子を返す関数
//---------------------関数の説明-------------------------
//+, -, × の演算子の中からランダムで1つ返す
//-------------------------------------------------------
function createOperater(){
  const operater = ["+" , "-" , "×"] ;
  return operater[Math.floor ( Math.random() * 2 )] ;
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
      const remainder = clause1 % clause2;
      if (clause1 < 0){
        clause1 = clause1 * (-1);
      }else if(clause2 < 0){
        clause2 = clause2 * (-1);
      }
      const division =  clause1 / clause2 | 0;
      console.log(remainder);
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

const createProblem = (sort, problemRange, digit) => {
    switch (sort) {
      case 1:
        return createIntegerProblem(problemRange);
      case 2:
        return createDecimalProblem(problemRange, digit);
      default:
        break
    }
    return;
  }

//渡されたランダムな小数を指定された桁数の小数に変換する関数
//---------------------関数の説明-------------------------
//例えば23.45678と2が渡されると小数23.45を返す
//-------------------------------------------------------
function createDecimal(value, digit) {
    let factorial = 1;
    for(let i = 0; i < digit; i++){
      factorial*=10
    }
    return Math.floor(value * factorial) / factorial;
}