/*
 * @Description:
 * @Author: chengfengZeng
 * @Date: 2021-05-21 18:02:59
 * @LastEditors: chengfengZeng
 * @LastEditTime: 2021-05-26 17:46:25
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
