function deepCopy(obj) {
  let newObj;
  //   判断是否是引用值
  if (typeof obj === "object" && obj !== null) {
    //   判断是否是数字
    if (Array.isArray(obj)) {
      newObj = [];
      //   遍历数组复制
      obj.forEach((item, index) => {
        if (typeof item !== "object") {
          newObj[index] = item;
        } else {
          newObj[index] = deepCopy(item);
        }
      });
    } else {
      newObj = {};
      //   遍历对象复制
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          newObj[key] = deepCopy(obj[key]);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  } else {
    newObj = obj;
  }
  return newObj;
}
let a1 = [1, 2, 3, 4];
let a2 = deepCopy(a1);
a2.push(3);
console.log(a1, a2);

let b1 = {
  a: 1,
  b: () => {},
  c: {
    d: 2,
  },
};
let b2 = deepCopy(b1);
b2.c = {
  d: 3,
};

console.log(b1, b2, b1.b(), b2.b());
