/*
 * @Description:数组转树形结构
 */
const arr = [
  {
    name: "小明",
    id: 1,
    pid: 0,
  },
  {
    name: "小花",
    id: 11,
    pid: 1,
  },
  {
    name: "小华",
    id: 111,
    pid: 11,
  },
  {
    name: "小李",
    id: 112,
    pid: 11,
  },
  {
    name: "小红",
    id: 12,
    pid: 1,
  },
  {
    name: "小王",
    id: 2,
    pid: 0,
  },
  {
    name: "小林",
    id: 21,
    pid: 2,
  },
  {
    name: "小李",
    id: 22,
    pid: 2,
  },
  {
    name: "小李",
    id: 223,
    pid: 22,
  },
];

// 递归

const arrayToTree1 = (arr, pid) => {
  console.time(pid);
  let resArr = [];
  arr.forEach((item) => {
    if (item.pid === pid) {
      let itemChildren = arrayToTree1(arr, item.id);
      if (itemChildren.length) {
        item.children = itemChildren;
      }
      resArr.push(item);
    }
  });
  console.timeEnd(pid);
  return resArr;
};

// 非递归

const arrayToTree2 = (arr) => {
  console.time(arr);
  let result = [];
  if (!Array.isArray(arr) || arr.length === 0) {
    return result;
  }
  let map = {};
  arr.forEach((item) => (map[item.id] = item));
  console.log(map, "map");
  arr.forEach((item) => {
    const parent = map[item.pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  console.timeEnd(arr);
  return result;
};

console.log(arrayToTree1(arr, 0));
console.log(arrayToTree2(arr, 0));
