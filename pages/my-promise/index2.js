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
