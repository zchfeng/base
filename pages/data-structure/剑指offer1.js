// https://blog.algomooc.com/

// 一、数组中重复的数字
// 找出数组中重复的数字。
// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。
// 请找出数组中任意一个重复的数字
// 示例：
// 输入：
// [2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3

function findRepeat1(arr) {
  let resArr = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (resArr.indexOf(element) !== -1) {
      resArr.push(element);
    } else {
      return element;
    }
  }
}

function findRepeat2(arr) {
  let resArr = {};
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (!resArr[element]) {
      resArr[element] = 1;
    } else {
      return element;
    }
  }
}
console.log(findRepeat1([2, 3, 1, 0, 2, 5, 3])); // 2
console.log(findRepeat2([2, 3, 1, 0, 2, 5, 3])); // 2

// 二维数组中的查找
// 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，
// 每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，
// 判断数组中是否含有该整数。
// 示例:
// 现有矩阵 matrix 如下：
// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// 给定 target = 5，返回 true。
// 给定 target = 20，返回 false。

function findTwoDimensionArr1(arr, value) {
  let allArr = arr.flat();
  return allArr.indexOf(value) !== -1;
}

function findTwoDimensionArr2(arr, value) {
  if (arr.length === 0 || arr[0].length === 0) {
    return false;
  }
  // 左下角元素
  let leftNumber = arr[arr.length - 1][0];
  if (value < leftNumber) {
    arr.pop();
  } else if (value > leftNumber) {
    arr.map((item) => {
      item.shift();
    });
  } else {
    return true;
  }
  return findTwoDimensionArr2(arr, value);
}
console.log(
  findTwoDimensionArr1(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    20
  )
);
console.log(
  findTwoDimensionArr2(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    20
  )
);
