// JavaScript树操作方法

// 1.数组扁平化
const flattenArr = [1, [2, [3, 4]], 5, [6]];

// 1.1  递归
const flatten1 = (arr) => {
  console.time(`flatten${arr}`);
  let resArr = [];
  arr.map((item) => {
    if (Array.isArray(key)) {
      resArr = resArr.concat(flatten1(key));
    } else {
      resArr.push(item);
    }
  });
  console.timeEnd(`flatten${arr}`);
  return resArr;
};

// 2.2  数组flat，参数：扁平化数组层数(有兼容问题)
const flatten2 = (arr) => {
  console.time("flatten2");
  let resArr = arr.flat();
  console.timeEnd("flatten2");
  return resArr;
};

console.log(flatten1(flattenArr), "flatten1>>>");
console.log(flatten2(flattenArr), "flatten2>>>");
