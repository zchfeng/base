/*
 * @Description:
 * @Author: chengfengZeng
 * @Date: 2021-10-25 15:15:14
 * @LastEditors: chengfengZeng
 * @LastEditTime: 2022-01-24 15:40:50
 */
// 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，
// 然后写一个 myClear，停止上面的 mySetInterVal

function mySetInterVal(fn, a, b) {
  if (typeof a !== "number" && typeof b !== "number") return false;
  this.timer = null;
  this.time = 0;
  this.start = () => {
    this.timer = setTimeout(() => {
      fn;
      console.log(this.time);
      this.time++;
      this.start();
    }, a + this.time * b);
  };
  this.stop = () => {
    clearTimeout(this.timer);
    this.time = 0;
  };
}

// const data = new mySetInterVal(
//   () => {
//     console.log("fn");
//   },
//   10,
//   1000
// );

// data.start();

// setTimeout(() => {
// data.stop();
// }, 10 + 1010 + 2010 + 3010 + 4100);

// 2.合并二维有序数组成一维有序数组，归并排序的思路

function mergeArr(arr1 = [], arr2 = []) {
  let sortArr = [];
  while (arr1.length > 0 && arr2.length > 0) {
    if (arr1[0] < arr2[0]) {
      sortArr.push(arr1.shift());
    } else {
      sortArr.push(arr2.shift());
    }
  }

  return sortArr.concat(arr1).concat(arr2);
}

function merge(arr = []) {
  if (!arr.length) {
    return arr;
  }
  while (arr.length > 1) {
    let arr1 = arr.shift();
    let arr2 = arr.shift();
    arr.push(mergeArr(arr1, arr2));
  }
  return arr[0];
}
// console.log(
//   merge([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [1, 2, 3],
//     [4, 5, 6],
//   ])
// );

// 3.斐波那契数列  // [1,1,2,3,5,8....]
// 递归
function fibo1(n) {
  if (n <= 1) return 1;
  return fibo1(n - 1) + fibo1(n - 2);
}

// console.log(fibo1(20));

// 尾递归
function fibo2(n, num1 = 1, num2 = 1) {
  if (n <= 1) return num1;
  return fibo2(n - 1, num1 + num2, num1);
}

// console.log(fibo2(50));

// 动态规划
function fibo3(n) {
  let res = new Array(n + 1);
  if (n <= 1) return res[n];
  for (let index = 0; index < n + 1; index++) {
    if (index <= 1) {
      res[index] = 1;
    } else {
      res[index] = res[index - 1] + res[index - 2];
    }
  }
  return res[n];
}

// console.log(fibo3(50));

// 4.字符串出现的不重复最长长度

//  动态规划-暴力解题
function maxLengthStr1(str) {
  let arr = new Array(str.length);
  let max = 1;

  arr[0] = str[0];
  for (let i = 1; i < arr.length; i++) {
    const item = str[i];
    let findIndex = 0;
    for (let j = 0; j < arr[i - 1].length; j++) {
      if (item === arr[i - 1][j]) {
        findIndex = j + 1;
        continue;
      }
    }
    arr[i] = arr[i - 1].substring(findIndex) + item;
    max = Math.max(max, arr[i].length);
  }

  return max;
}

// console.log(maxLengthStr1("12345671289043"));

// 滑动窗口
var maxLengthStr2 = function (s) {
  const len = s.length;
  if (len < 2) {
    return len;
  }
  let map = new Map(),
    max = 0;
  for (let i = 0, j = 0; j < len; j++) {
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j]) + 1, i);
    }
    max = Math.max(max, j - i + 1);
    map.set(s[j], j);
  }
  return max;
};

// console.log(maxLengthStr2("12231"));

// 13.有一堆整数，请把他们分成三份，确保每一份和尽量相等（11，42，23，4，5，6 4 5 6 11 23 42 56 78 90）
function triplicate(params = [], num) {
  let arr = params.sort((i, j) => j - i);
  let arrRes = Array.from({ length, num }, () => []);
  let arrSum = new Array(num);
  while (arr.length > 0) {}
}
