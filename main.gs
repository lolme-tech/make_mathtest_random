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
  ['実数部分の桁数⇒実数部分を何桁にするか決定してください', '2'],
  ['小数部分の桁数⇒小数部分を何桁にするか決定してください', '2'],
  ];
  const targetDoc = DocumentApp.openById(openDocumentId);
  targetDoc.clear();
  let body = targetDoc.getBody();

  //表の作成
  body.appendTable(rowsData);
}

// //分数問題作成の関数(開発中)
// function createFractionTable() {
//   //表データ（配列）
//   const rowsData = [['問題割り当て(この行はいじらないでください)', '3'], 
//   ['最大値⇒ランダムに生成する問題の最大値を決定してください', '100'],
//   ['最小値⇒ランダムに生成する問題の最小値を決定してください', '-100'],
//   ];
//   const targetDoc = DocumentApp.openById(openDocumentId);
//   targetDoc.clear();
//   let body = targetDoc.getBody();

//   //表の作成
//   body.appendTable(rowsData);
// }

//問題作成の関数
function myFunction() {
  const targetDoc = DocumentApp.openById(openDocumentId);
  const targetTable = targetDoc.getBody().getTables()[0]
  const sort = Number(targetTable.getRow(0).getCell(1).getText());
  const problemRange = { minInt: Number(targetTable.getRow(1).getCell(1).getText()), maxInt: Number(targetTable.getRow(2).getCell(1).getText()) }
  const quantity = 15
  const operater = ["+", "-", "×"];

  targetDoc.clear();
  targetDoc.getParagraphs()[0].insertText(0, " 次を計算をしてください  \n 名前:").setFontSize(15);

  // 問題作成
  const problemList = createProblem(sort, problemRange, quantity);

  // 問題出力
  problemList.forEach((problemInfo, index) => {
    targetDoc.appendParagraph("(" + (index + 1) + ")  " + addBrackets(problemInfo.first) + " " + operater[problemInfo.operater] + " " + addBrackets(problemInfo.second) + " = \n\n").setFontSize(18);
  })
  targetDoc.appendPageBreak();
  // 解答出力
  problemList.forEach((problemInfo, index) => {
    if (!problemInfo.isRemainder) {
      targetDoc.appendParagraph("(" + (index + 1) + ")  " + addBrackets(problemInfo.first) + " " + operater[problemInfo.operater] + " " + addBrackets(problemInfo.second) + " = " + problemInfo.result).setFontSize(15);
    } else {
      targetDoc.appendParagraph("(" + (index + 1) + ")  " + addBrackets(problemInfo.first) + " " + operater[problemInfo.operater] + " " + addBrackets(problemInfo.second) + " = " + problemInfo.result + " 余り " + problemInfo.isRemainder).setFontSize(15);
    }
  })
}


/**
 * 選択された問題を作成するメソッド
 * @param {String} sort - 選択肢 1:整数の問題/2:少数の問題/3:分数の問題
 * @param {Object} problemRange - 問題の範囲
 * @param {Number} quantity - 問題数
 * @return void 
 * 
 */
const createProblem = (sort, problemRange, quantity) => {
  switch (sort) {
    case 1:
      return createIntegerProblemList(problemRange, quantity);
    case 2:
      return createDecimalProblemList(problemRange, quantity);
    default:
      break
  }
  return;
}