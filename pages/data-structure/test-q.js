/*
 * @Description:算法题
 * @Author: chengfengZeng
 * @Date: 2021-10-28 16:19:22
 * @LastEditors: chengfengZeng
 * @LastEditTime: 2021-10-29 11:40:07
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
function climbStairs1(n) {
  let dp = [];
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;
  for (let index = 3; index <= n; index++) {
    dp[index] = dp[index - 1] + dp[index - 2];
  }

  return `dp:${dp[n]}
          记录步数${dp}
      `;
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
console.log(climbStairs3(9), "climbStairs3");

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
console.log(climbStairs4(9), "climbStairs4");
