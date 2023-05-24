function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('メニュー')
    .addItem('問題を作る', 'myFunction')
    .addItem('問題作成メニューを表示', 'createProblemTable')
    .addToUi();
}

//問題作成メニュー表示の関数
function createProblemTable() {
  //表データ（配列）
  const rowsData = [['問題選択', ''],
  ['最大値', '0'],
  ['最小値', '0'],
  ];
  const targetDoc = DocumentApp.openById('1OK-lyK7N27-j7nUHz80sOm4Pivoc9ovT5ECx-NCXD-U');
  targetDoc.clear();
  let body = targetDoc.getBody();

  //表の作成
  body.appendTable(rowsData);
}

//問題作成の関数
function myFunction() {
  const targetDoc = DocumentApp.openById('1OK-lyK7N27-j7nUHz80sOm4Pivoc9ovT5ECx-NCXD-U');
  const targetTable = targetDoc.getBody().getTables()[0]
  const sort = Number(targetTable.getRow(0).getCell(1).getText());
  const problemRange = { minInt: Number(targetTable.getRow(1).getCell(1).getText()), maxInt: Number(targetTable.getRow(2).getCell(1).getText()) }
  const quantity = 15
  const operater = ["+", "-", "×"];

  targetDoc.clear();
  targetDoc.getParagraphs()[0].insertText(0, " 次を計算をしてください \n").setFontSize(15);

  // 問題作成
  const problemList = createProblem(sort, problemRange, quantity);
  console.log(problemList)
  // 計算結果
  const answerList = calculate(problemList);
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
    default:
      break
  }
  return;
}