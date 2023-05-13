/**
 * 整数の問題を作るメソッド
 * @param {Number} minInt - 問題の最小値
 * @param {Number} maxInt - 問題の最大値
 * @param {Number} quantity - 問題数 
 * @returns {Object} problemList - 問題のリスト
 */
const createIntegerProblemList = (problemRange, quantity) => {
  const problemList = []
  for (let i = 0; i < quantity; i++) {
    const problemInfo = { first: 0, second: 0, operater: '' }

    problemInfo.first = Math.floor(Math.random() * (problemRange.maxInt + 1 - problemRange.minInt)) + problemRange.minInt;
    problemInfo.second = Math.floor(Math.random() * (problemRange.maxInt + 1 - problemRange.minInt)) + problemRange.minInt;
    problemInfo.operater = Math.floor(Math.random() * 4);

    problemList.push(problemInfo)
  }
  return problemList;
}

/**
 * 問題の計算をするメソッド
 * @param {Object} outputList - 問題のリスト
 * @returns {Object} outputList - 解答のリスト
 */
const calculate = (outputList) => {
  outputList.forEach((problemInfo, index) => {
    problemInfo.result = "";

    switch (problemInfo.operater) {
      case 0:
        Object.assign(problemInfo, { result: problemInfo.first + problemInfo.second });
        break;
      case 1:
        Object.assign(problemInfo, { result: problemInfo.first - problemInfo.second });
        break;
      case 2:
        Object.assign(problemInfo, { result: problemInfo.first * problemInfo.second });
        break;
      case 3:
        if (problemInfo.first < 0) {
          problemInfo.first = problemInfo.first * (-1);
        } else if (problemInfo.second < 0) {
          problemInfo.second = problemInfo.second * (-1);
        }
        const division = problemInfo.first / problemInfo.second | 0;
        Object.assign(problemInfo, { result: problemInfo.first / problemInfo.second | 0 });
        if (problemInfo.first % problemInfo.second !== 0) {
          Object.assign(problemInfo, { isRemainder: problemInfo.first % problemInfo.second });
        }
        break;
      default:
        break;
    }
  })
  return outputList
}

function addBrackets(value) {
  if (value < 0) {
    return "( " + value + " )";
  } else {
    return value;
  }
}


