// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
// 问总共有多少条不同的路径？

// 解析：假设:机器人位置（1,1）,finish(m,n)。机器人没向右走一步x轴+1,向下走一步Y轴加1。
// x坐标不能小于m,Y轴不能大于n。走到finish前一步只会是（m-1,n）或者(m,n-1)。（m-1,n）点前面只能是（m-2,n）
// 或者（m-1,n-1），。。。。。以此类推

// dp[m][n] = dp[m-1][n] + dp[m][n-1]

function testQ1(m, n) {
  if (m === 1 || n === 1) {
    return 1;
  }
  return testQ1(m - 1, n) + testQ1(m, n - 1);
}

function testQ2(m, n) {
  let dp = [];
  dp[0] = [];
  dp[0][0] = 0;
  for (let i = 1; i < m; i++) {
    dp[i] = [];
    dp[i][0] = 1;
  }
  for (let j = 1; j < m; j++) {
    dp[0][j] = 1;
  }
  for (let a = 1; a < m; a++) {
    for (let b = 1; b < n; b++) {
      dp[a][b] = dp[a - 1][b] + dp[a][b - 1];
    }
  }
  return dp[m - 1][n - 1];
}

console.log(testQ1(3, 2));
console.log(testQ2(3, 2));

/* 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？*/
// 输入:
// [
//   [0,0,0],
//   [0,1,0],
//   [0,0,0]
// ]
// 输出: 2

// 分析:跟上面那题一样,dp[m][n] = dp[m-1][n] + dp[m][n-1]
//      唯一不同点,arr[m][n] =1的时候为障碍物，走不到。即arr[m][n] =1,dp[m][n] = 0
let arr = [
  [0, 0, 0, 0],
  [0, 1, 0, 1],
  [0, 0, 0, 0],
  [0, 1, 0, 0],
];
function testQ3(arr) {
  let m = arr.length;
  let n = arr[0].length;
  let dp = Array.from({ length: m }, () => []);
  for (let index = 0; index < m; index++) {
    dp[index][0] = arr[index][0] === 1 ? 0 : 1;
  }
  for (let index = 0; index < n; index++) {
    dp[0][index] = arr[0][index] === 1 ? 0 : 0;
  }
  for (let a = 1; a < m; a++) {
    for (let b = 1; b < n; b++) {
      dp[a][b] = arr[a][b] === 1 ? 0 : dp[a - 1][b] + dp[a][b - 1];
    }
  }
  return dp[m - 1][n - 1];
}
console.log(testQ3(arr), "testQ3");

// 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
// 说明：每次只能向下或者向右移动一步。
// 输入:
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// 输出: 7
// 解释: 因为路径 1→3→1→1→1 的总和最小。
// 分析：跟上题差不多，dp[m][n] = Math.min(dp[m-1][n],dp[m][n-1])+arr[m][n]
let arr2 = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];
function testQ4(arr) {
  let m = arr.length;
  let n = arr[0].length;
  let dp = Array.from({ length: m }, () => []);
  dp[0][0] = arr[0][0];
  for (let a = 1; a < m; a++) {
    dp[0][a] = arr[0][a] + dp[0][a - 1];
  }

  for (let b = 1; b < n; b++) {
    dp[b][0] = arr[b][0] + dp[b - 1][0];
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = arr[i][j] + Math.min(dp[i][j - 1], dp[i - 1][j]);
    }
  }

  return dp[m - 1][n - 1];
}

console.log(testQ4(arr2), "testQ4");

// 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。

// 输入:

// 1 0 1 0 0
// 1 0 1 1 1
// 1 1 1 1 1
// 1 0 0 1 0

// 输出: 4
// 分析：dp[m][n]处的最大矩形包括dp[m-1][n-1]和dp[m-1][n]和dp[m1][n-1]的最大矩形
//      即：dp[m][n] = Math.min(dp[m-1][n-1],dp[m-1][n],dp[m1][n-1]) + 1

let arr3 = [
  [1, 0, 1, 0, 0],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0],
];
function testQ5(arr) {
  let m = arr.length;
  let n = arr[0].length;
  let dp = Array.from({ length: m }, () => []);
  let maxLength = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0 || arr[i][j] === 0 || dp[i - 1][j - 1] === 0) {
        dp[i][j] = arr[i][j];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
        maxLength = Math.max(dp[i][j], maxLength);
      }
    }
  }

  return maxLength * maxLength;
}

console.log(testQ5(arr3), "testQ5");
