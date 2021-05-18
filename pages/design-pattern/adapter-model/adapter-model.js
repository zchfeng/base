/*
 * @Description:
 * @Author: chengfengZeng
 * @Date: 2021-05-18 17:24:01
 * @LastEditors: chengfengZeng
 * @LastEditTime: 2021-05-18 18:00:35
 */
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
