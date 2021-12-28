class Queue {
  constructor() {
    this._items = [];
  }
  //  向队列尾部添加元素
  enqueue(value) {
    this._items.push(value);
  }
  //   移除队列第一项（最前面的项），返回移除的元素
  dequeue() {
    return this._items.shift();
  }
  // 返回队列最前面（第一）的项
  head() {
    return this._items[0];
  }
  // 返回队列最后面的项
  tail() {
    return this._items[this._items.length - 1];
  }
  //   判断队列有无元素
  isEmpty() {
    return !!this._items.length;
  }
  //   返回对应元素个数
  size() {
    return this._items.length;
  }
  //   清空队列
  clear() {
    this._items = [];
  }
}

var MyStack = function () {
  this.queue1 = new Queue();
  this.queue2 = new Queue();
  this.currentQ = this.queue1;
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  if (!this.queue1.isEmpty()) {
    this.queue1.enqueue(x);
    while (this.queue2.isEmpty()) {
      this.queue1.enqueue(this.queue2.dequeue());
    }
    this.currentQ = this.queue1;
  } else {
    this.queue2.enqueue(x);
    while (this.queue1.isEmpty()) {
      this.queue2.enqueue(this.queue1.dequeue());
    }
    this.currentQ = this.queue2;
  }
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  return this.currentQ.dequeue();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  return this.currentQ.head();
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return this.queue1.empty();
};

let myStack = new MyStack();
myStack.push(1);
myStack.push(2);
let top = myStack.top();
let pop = myStack.pop();
// console.log(myStack, top, pop);

class LinkListItem {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class MyQueue {
  constructor() {
    this.front = new LinkListItem(null);
    this.rear = this.front;
  }
  //  向队列尾部添加元素
  enqueue(value) {
    let newNode = new LinkListItem(value);
    this.rear.next = newNode;
    this.rear = newNode;
  }
  //   移除队列第一项（最前面的项），返回移除的元素
  dequeue() {
    if (this.rear === this.front) {
      return -1;
    }
    let topNode = this.front.next;
    if (topNode.next === null) {
      this.rear = this.front;
    }
    this.front.next = topNode.next;
    return topNode.data;
  }
}

let myQueue = new MyQueue();
myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);
console.log(myQueue);
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
