function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('GAS')
    .addItem('実行', 'myFunction')
    .addToUi();
}

const minInteger = -100;
const maxInteger = 100;

function myFunction() {
  const targetDoc = DocumentApp.openById('1OK-lyK7N27-j7nUHz80sOm4Pivoc9ovT5ECx-NCXD-U');
  const targetTable = targetDoc.getBody().getTables()[0]
  const sort = Number(targetTable.getRow(0).getCell(1).getText());
  const problemRange = { minInt: Number(targetTable.getRow(1).getCell(1).getText()), maxInt: Number(targetTable.getRow(2).getCell(1).getText()) }
  const quantity = 15
  const operater = ["+", "-", "×", "÷"];

  targetDoc.clear();
  targetDoc.getParagraphs()[0].insertText(0, " 次を計算をしてください \n").setFontSize(15);
  console.log("start ; " + problemRange)

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
 * @param {String} sort - 選択肢　1:整数の問題/2:少数の問題/3:分数の問題
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


