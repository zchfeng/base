/*
 * @Description:
 * @Author: chengfengZeng
 * @Date: 2021-11-05 14:08:18
 * @LastEditors: chengfengZeng
 * @LastEditTime: 2022-01-12 17:18:18
 */
/* 假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。
当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 n x 3 的矩阵来表示的。
例如，costs[0][0]表示第 0 号房子粉刷成红色的成本花费；costs[1][2]表示第 1 号房子粉刷成绿色的花费，以此类推。请你计算出粉刷完所有房子最少的花费成本。*/

// 输入: [[17,2,17],[16,16,5],[14,3,19]]
// 输出: 10
// 解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。
//      最少花费: 2 + 5 + 3 = 10。
let arr = [
  [17, 2, 17],
  [16, 16, 5],
  [14, 3, 19],
];
function test1(arr) {
  let length = arr.length;
  let dp = Array.from({ length }, () => []);
  dp[0] = arr[0];
  for (let i = 1; i < length; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + arr[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + arr[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + arr[i][2];
  }
  return Math.min(...dp[length - 1]);
}
console.log(test1(arr), "test1");

// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

// 输入: [1,2,3,1]
// 输出: 4
// 解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//      偷窃到的最高金额 = 1 + 3 = 4

function test2(arr) {
  let length = arr.length;
  let dp = new Array(length);
  let maxMoney = 0;
  for (let i = 0; i < length; i++) {
    if (i <= 1) {
      dp[i] = arr[i];
    } else {
      dp[i] = dp[i - 2] + arr[i];
    }
    maxMoney = Math.max(dp[i], maxMoney);
  }
  return maxMoney;
}

console.log(test2([2, 7, 9, 3, 1]), "test2");

var findRelativeRanks = function (score) {
  let resRank = [];
  let minRankValue = -1;
  let result = [];
  for (let i = 0; i < score.length; i++) {
    let currentScore = score[i];
    let resObj = {
      value: currentScore,
      ranking: resRank.length + 1,
    };
    if (!resRank.length || currentScore < minRankValue) {
      minRankValue = currentScore;
    } else {
      for (let j = 0; j < resRank.length; j++) {
        if (currentScore > resRank[j].value) {
          resObj.ranking = Math.min(resObj.ranking, resRank[j].ranking);
          resRank[j].ranking += 1;
        }
      }
    }
    resRank.push(resObj);
  }
  console.log(resRank);
  for (let i = 0; i < resRank.length; i++) {
    let rank;
    switch (resRank[i].ranking) {
      case 1:
        rank = "Gold Medal";
        break;
      case 2:
        rank = "Silver Medal";
        break;
      case 3:
        rank = "Bronze Medal";
        break;
      default:
        rank = String(resRank[i].ranking);
        break;
    }

    result.push(rank);
  }
  return result;
};

console.log(findRelativeRanks([5, 4, 3, 2, 1, 6]));

let arrData = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let result = [];
for (let i = 0; i <= Math.floor(arrData.length / 2); i++) {
  result.push({
    type: "bar",
    name: arrData[i],
    data: [arrData[i], arrData[Math.floor(arrData.length / 2) + i]],
  });
}
console.log(result);
