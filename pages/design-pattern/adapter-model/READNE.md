# 适配器模式

## 定义

`解决两个软件实体间的接口不兼容的问题，对不兼容的部分进行适配`

## 核心

`解决两个接口之间不兼容的问题`

## 实现

```
// 渲染数据  限制为数组
function renderData(data) {
  data.forEach((element) => {
    console.log(element);
  });
}

// 对非数组的进行转换适配
function arrAdapter(data) {
  if (typeof data !== "object") {
    return [];
  }
  if (Object.prototype.toString.call(data) === "[object Array]") {
    return data;
  }
  var temp = [];
  for (var item in data) {
    if (data.hasOwnProperty(item)) {
      temp.push(data[item]);
    }
  }

  return temp;
}

renderData(arrAdapter({ a: 1, b: 2, c: 3 }));
```

## 优缺点

**优点**

- 客户可以透明的调用目标接口
- 将目标类和适配者类解耦，解决了目标类和适配者类接口不一致的问题

**缺点**

- 适配器需要结合业务场景考虑使用，可能会增加系统的复杂性
- 增加代码圆度难度，降低代码可读性
