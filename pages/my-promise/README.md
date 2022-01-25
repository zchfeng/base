# Promise

## 定义

```
new Promise((resolve,reject)=>{
    resolve() // reject()
})
```

通过 new 运算符声明 promise,Promise 构造函数接收一个有两个参数的函数

# 方法

## then()

定义：then 方法接受两个参数：Promise.then(onFulfilled,onRejected)

onFulfilled,onRejected 都是可选参数

promise 结束后才能调用

调用次数不超过一次

# 实现

## 代码结构

```
function myPromise(executor) {}

myPromise.prototype.then = function () {};
myPromise.prototype.catch = function () {};
myPromise.prototype.resolve = function () {};
myPromise.prototype.reject = function () {};
myPromise.prototype.all = function () {};
myPromise.prototype.race = function () {};

```

## 实现构造函数

```
function myPromise(executor) {
  // 定义状态
  this.state = "pending";
  // 成功后的返回值
  this.value = undefined;
  //  失败后的返回值
  this.err = undefined;
  //  成功时的回调函数队列
  this.onFulfilledCallbacks = [];
  //  失败时的回调函数队列
  this.onRejectedCallbacks = [];

  var _this = this;

  //   定义成功事件 - 触发成功事件时，修改状态和执行成功回调队列里的回调方法
  function resolve(value) {
    if (_this.state === "pending") {
      _this.state = "fulfilled";
      _this.value = value;
      _this.onFulfilledCallbacks.forEach((callback) => {
        callback();
      });
    }
  }

  //   定义失败事件 - 触发失败事件时，修改状态和执行失败回调队列里的回调方法
  function reject(value) {
    if (_this.state === "pending") {
      _this.state === "rejected";
      _this.err = value;
      _this.onRejectedCallbacks.forEach((callback) => {
        callback();
      });
    }
  }

  //   触发executor
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
```

## 实现 then

```
myPromise.prototype.then = function (onFulfilled, onRejected) {
  // 判断参数是不是函数
  onFulfilled =
    typeof onFulfilled === "function"
      ? onFulfilled
      : function (value) {
          return value;
        };

  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (err) {
          throw err;
        };

  let _this = this;

  let promise2 = new myPromise((resolves, reject) => {
    if (_this.state === "fulfilled") {
      onFulfilled(_this.value);
    }

    if (_this.state === "rejected") {
      onRejected(_this.err);
    }

    if (_this.state === "pending") {
      _this.onFulfilledCallbacks.push(() => {
        onFulfilled(_this.value);
      });

      _this.onRejectedCallbacks.push(() => {
        onRejected(_this.err);
      });
    }
  });

  return promise2;
};
```

# 链式调用

在使用 promise 是经常用到 new Promise().then().then()的写法，这个就是链式调用。

之前的 then 方法已经返回一个 promise,但是没有完全实现链式调用的写法。还需要将 promise2 返回的值传递到下个 then 中

如果在第一个 then 方法返回一个值 X。需要对 X 进行判断，从而根据 X 的值来改变 promise2 的状态，而判断 x 的函数叫做 resolvePromise.

- 如果 onFulfilled 或者 onRejected 返回一个值，则运算下面的 promise 解决过程：[[Resolve]](promise2,x)
- 如果 onFulfilled 或者 onRejected 抛出一个异常，则 promise2 拒绝执行，应返回拒因 e
- 如果 onFulfilled 不是函数并且 promise1 成功执行，promise2 必须成功执行并返回相同的值
- 如果 onRejected 不是函数并且 promise1 拒绝执行，promise2 必须拒绝执行并返回相同的拒因

## promise 解决过程

如果 x 为对象或者函数：

- 把 x.then 复制给 then
- 如果取 x.then 的值时抛出错误 e，则以 e 为拒因拒绝 promise
- 如果 then 是函数，将 x 作为函数的作用域 this 调用

如果 x 不为对象或者函数，以 x 为参数执行 promise

## 实现 resolvePromise

```
function resolvePromise(promise2, x, resolve, reject) {
  // 如果x===promise2  会造成循环引用
  if (x === promise2) {
    return reject(new TypeError("chaining cycle detected for promise!"));
  }

  //    防止多次调用
  let called;

  // x不是null 且x是对象或者函数
  if ((x !== null && typeof x === "object") || typeof x === "function") {
    try {
      var then = x.then;

      // 如果then是函数，默认x是promise
      if (typeof then === "function") {
        // 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
        then.call(
          x,
          function (y) {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;

            resolvePromise(promise2, y, reject, reject);
          },
          function (r) {
            if (called) return;
            called = true;

            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

```

## then 方法修改

```
myPromise.prototype.then = function (onFulfilled, onRejected) {
  // 判断参数是不是函数
  onFulfilled =
    typeof onFulfilled === "function"
      ? onFulfilled
      : function (value) {
          return value;
        };

  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (err) {
          throw err;
        };

  let _this = this;

  let promise2 = new myPromise((resolves, reject) => {
    if (_this.state === "fulfilled") {
      var x = onFulfilled(_this.value);
      resolvePromise(promise2, x, resolves, reject);
    }

    if (_this.state === "rejected") {
      var x = onRejected(_this.err);
      resolvePromise(promise2, x, resolves, reject);
    }

    if (_this.state === "pending") {
      _this.onFulfilledCallbacks.push(() => {
        var x = onFulfilled(_this.value);
        resolvePromise(promise2, x, resolves, reject);
      });

      _this.onRejectedCallbacks.push(() => {
        var x = onRejected(_this.err);
        resolvePromise(promise2, x, resolves, reject);
      });
    }
  });

  return promise2;
};

```

## [完整代码](https://github.com/zchfeng/base/blob/master/pages/my-promise/index.js)
