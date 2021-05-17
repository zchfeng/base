/*
 * @Description:
 * @Author: chengfengZeng
 * @Date: 2021-05-17 17:26:32
 * @LastEditors: chengfengZeng
 * @LastEditTime: 2021-05-17 17:33:22
 */
var prototype = {
  name: "jack",
  getName: function () {
    return this.name;
  },
};

var obj = Object.create(prototype, {
  job: {
    value: "IT",
  },
});

console.log(obj);
console.log(obj.name);
console.log(obj.job);
console.log(obj.__proto__ === prototype);
