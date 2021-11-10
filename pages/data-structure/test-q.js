/*
 * @Description:
 * @Author: chengfengZeng
 * @Date: 2021-10-28 16:19:22
 * @LastEditors: chengfengZeng
 * @LastEditTime: 2021-11-10 15:56:12
 */
// Q1:小明手中有 1，5，10，50，100 五种面额的纸币，每种纸币对应张数分别为 5，2，2，3，5 张。
// 若小明需要支付 456 元，则需要多少张纸币？
// 分析：在不考虑纸币数量的情况下 456 = 100*4 + 50*1 + 5*1 + 1*1,从大的金额开始计算
function test1(money) {
  // 面额集合
  let denomination = [1, 5, 10, 50, 100];
  // 对应面额数量
  let denomination_num = [5, 2, 2, 3, 5];
  // 记录张数
  let num = 0;
  // 剩余需要计算的金额
  let surplus_money = money;
  if (surplus_money <= 0) {
    return num;
  }

  for (let index = denomination.length - 1; index >= 0; index--) {
    // 使用while,因为一个金额可能需要多张
    while (
      surplus_money >= denomination[index] &&
      denomination_num[index] > 0
    ) {
      surplus_money = surplus_money - denomination[index];
      denomination_num[index]--;
      num++;
      if (surplus_money == 0) {
        return `刚好${surplus_money},
        已记录${num}张
        剩余${denomination}元${denomination_num}张`;
      }
    }
  }

  return `剩余缺少${surplus_money},
          已记录${num}张
          剩余${denomination}元${denomination_num}张`;
}
test1(654);
// console.log(test1(654));

/* Q2:假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。*/

/* 分析：n=0的时候，不用爬，0。
n=1的时候，爬1个台阶，1种方法
n=2的时候，爬两次1个台阶或者一次2个台阶，2种方法
n=3的时候，只能从第二阶爬1个台阶或者第一阶爬2个台阶到达，n=3的时候等于n=1次数+n=2次数
...
n的时候，只能从第n-1阶爬1个台阶或者第n-2阶爬2个台阶到达，n的时候等于n-1的次数+n-2的次数
即：dp[n] = dp[n-1]+dp[n-2] */

// 动态规划-空间换时间，把计算的值存储起来
function climbStairs(n) {
  let dp = [];
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;
  for (let index = 3; index <= n; index++) {
    dp[index] = dp[index - 1] + dp[index - 2];
  }

  return dp[n];
}

climbStairs1(9);
// console.log(climbStairs1(9), "climbStairs12(9)");

// 动态规划-优化版
function climbStairs2() {
  let dp = [];
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;

  return function (n) {
    if (n >= dp.length) {
      for (let index = dp.length; index <= n; index++) {
        // console.log(index, "index");
        dp[index] = dp[index - 1] + dp[index - 2];
      }
    }
    return `dp:${dp[n]}
    记录步数${dp}
    `;
  };
}

let climbStairsObj = climbStairs2();
// console.log(climbStairsObj(9), "climbStairsObj(9)");
// console.log(climbStairsObj(6), "climbStairsObj(6)");
// console.log(climbStairsObj(14), "climbStairsObj(14)");

// 递归解法
function climbStairs3(n) {
  if (n == 0) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }
  if (n == 2) {
    return 2;
  }
  return climbStairs3(n - 1) + climbStairs3(n - 2);
}

climbStairs3(9); // 55
// console.log(climbStairs3(9), "climbStairs3");

// 尾递归
function climbStairs4(n, dp1 = 1, dp2 = 2) {
  if (n == 0) return 0;
  if (n == 1) {
    // ?为什么是n=1的时候结束
    // resArr = [0,1,2,3,5,8,13,..........,resArr[n-1]+resArr[n-2]]
    // 1、因为dp1的默认值是结果数组索引1的值???
    // 2、推导：n为resArr计算值的索引，dp1默认值为数组索引1的值，dp2默认值为数组索引2的值
    // 每递归一次，n-1,dp1和dp2都会往后推进一位
    // 当dp1往后推进n-1次，dp1就是resArr[n],所以只要递归n-1次
    return dp1;
  } else {
    return climbStairs4(n - 1, dp2, dp2 + dp1);
  }
}

climbStairs4(9); // 55
// console.log(climbStairs4(9), "climbStairs4");

/* 2、给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。 */
// [
//    [2],
//   [3,4],
//  [6,5,7],
// [4,1,8,3]
// ]
// 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。

/* 分析：由下往上计算，要加上一层的某一个值，必须是下一层的相邻两个，即arr[i][j]只能被arr[i+1][j]或者arr[i+1][j+1]相加
    所以计算最小值，只需要拿顶点与下一层最小路径和相加，
    同理，下一层最小值，只需要拿顶点与下下一层最小路径和相加，
    ...
  即：最小路径 = 下一层最小路径 + 顶点值[0][0]
   dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j] */
const arr = [
  [2],
  [3, 4],
  [6, 5, 7],
  [4, 1, 8, 3],
  [4, 5, 8, 3, 5],
  [4, 5, 8, 3, 5, 7],
];
// 动态规划-把数组转成当前最小路径和
function triangle_path1(arr) {
  let n = arr.length; // arr深度，每层个数等于当前层
  let res = new Array(n);
  res[n - 1] = arr[n - 1]; // 最下面一层不用计算
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < i + 1; j++) {
      if (!res[i]) {
        res[i] = [];
      }
      res[i][j] = Math.min(res[i + 1][j], res[i + 1][j + 1]) + arr[i][j];
    }
  }
  return {
    sum: `最小路径和${res[0][0]}`,
    res,
  };
}

console.log(triangle_path1(arr), "triangle_path1");

//递归
function triangle_path2(arr) {
  if (arr.length === 1) {
    return arr[0][0];
  }

  let currentArr = arr.concat([]);
  let leftArr = [];
  let rightArr = [];

  currentArr.shift();

  currentArr.map((item) => {
    leftArr.push(item.slice(0, item.length - 1));
    rightArr.push(item.slice(1));
  });

  return (
    Math.min(triangle_path2(leftArr), triangle_path2(rightArr)) + arr[0][0]
  );
}
// console.log(triangle_path2(arr), "triangle_path2");

// 3、给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// 输入: [-2,1,-3,4,-1,2,1,-5,4],
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
/* 分析：求数组某一点的最大区间和方式：这一点的上一点最大和+当前值 dp[n] = dp[n-1]+arr[n]
          如果dn[n-1]<0,dp[n] = arr[n] */

function test3(arr) {
  let dp = new Array(arr.length);
  let dpArr = new Array(arr.length);
  dp[0] = arr[0];
  dpArr[0] = [arr[0]];
  let resObj = {
    value: arr[0],
    valueArr: dpArr[0],
  };

  for (let index = 1; index < arr.length; index++) {
    if (dp[index - 1] > 0) {
      dp[index] = dp[index - 1] + arr[index];
      dpArr[index] = [...dpArr[index - 1], arr[index]];
      resObj =
        resObj.value < dp[index]
          ? {
              value: dp[index],
              valueArr: dpArr[index],
            }
          : resObj;
    } else {
      dp[index] = arr[index];
      dpArr[index] = [arr[index]];
    }
  }

  return resObj;
}
// console.log(test3([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
