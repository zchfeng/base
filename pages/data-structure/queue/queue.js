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
