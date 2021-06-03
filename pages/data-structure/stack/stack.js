/*
 * @Description:
 * @Author: chengfengZeng
 * @Date: 2021-05-21 18:02:59
 * @LastEditors: chengfengZeng
 * @LastEditTime: 2021-05-27 16:40:07
 */
// js实现栈结构
class Stack {
  constructor() {
    this.item = [];
  }
  // 向栈顶添加元素
  push(value) {
    this.item.push(value);
  }
  // 向栈顶删除元素-返回删除元素
  pop() {
    return this.item.pop();
  }
  // 返回栈顶元素-不改变栈
  peek() {
    return this.item[this.item.length - 1];
  }
  // 判断栈内有无元素
  isEmpty() {
    return !!this.item.length;
  }
  // 返回栈内元素个数
  size() {
    return this.item.length;
  }
  // 清空栈
  clean() {
    this.item = [];
  }
}
const stack = new Stack();
console.log(stack);
stack.push(1);
stack.push(2);
stack.pop();
stack.pop();

var hammingDistance = function (x, y) {
  let xStack = [];
  let yStack = [];
  if (x < 2) {
    xStack.push(x);
  }
  if (y < 2) {
    yStack.push(x);
  }
  while (x >= 2) {
    xStack.push(x % 2);
    x = parseInt(x / 2);
    if (x < 2) {
      xStack.push(1);
    }
  }
  while (y >= 2) {
    yStack.push(y % 2);
    y = parseInt(y / 2);
    if (y < 2) {
      yStack.push(1);
    }
    console.log(y, 112);
  }

  let xLength = xStack[xStack.length - 1] ? xStack.length : xStack.length - 1;
  let yLength = yStack[yStack.length - 1] ? yStack.length : yStack.length - 1;
  console.log(xLength, xStack, "x");
  console.log(yLength, yStack, "y");
  return yLength - xLength;
};
console.log(hammingDistance(0, 6));
