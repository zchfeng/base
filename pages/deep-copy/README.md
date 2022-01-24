### 浅拷贝和深拷贝

- 浅拷贝

直接赋值

- 深拷贝  
  JSON.stringify()
  数组：slice() concat()  
  深层递归遍历：[deepCopy](https://github.com/zchfeng/js-base/tree/master/pages/deep-copy/deep-copy.js)

```
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
```
