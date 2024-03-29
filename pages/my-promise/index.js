class MyPromise {
  //传入参数为一个函数
  constructor(executor) {
    // 定义初始值，初始状态，初始任务队列
    this.value = null;
    this.error = null;
    this.state = PENDING;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    // 触发resolve时，执行成功队列里所以的方法
    const resolve = (value) => {
      if (this.state == PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((onFulfillCallback) => {
          onFulfillCallback(this.value);
        });
      }
    };
    // 触发reject时，执行成功队列里所以的方法
    const reject = (error) => {
      if (this.state == PENDING) {
        this.state = REJECTED;
        this.error = error;
        this.onRejectedCallbacks.forEach((onRejectedCallback) => {
          onRejectedCallback(this.error);
        });
      }
    };
    // 外层控制测试捕获
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  resolvePromise(nextPromise, lastResult, resolve, reject) {
    if (nextPromise == lastResult) {
      reject(new TypeError("Chaining Cycle"));
    }
    if (
      (lastResult && typeof lastResult === "object") ||
      typeof x === "function"
    ) {
      let used;
      try {
        //如果还是一个promise
        let then = lastResult.then;
        if (typeof then === "function") {
          then.call(
            lastResult,
            (result) => {
              if (used) return;
              used = true;
              this.resolvePromise(nextPromise, result, resolve, reject);
            },
            (err) => {
              if (used) return;
              used = true;
              reject(err);
            }
          );
        } else {
          if (used) return;
          used = true;
          resolve(lastResult);
        }
      } catch (error) {
        if (used) return;
        used = true;
        reject(error);
      }
    } else {
      resolve(lastResult);
    }
  }

  then(onFulfilled, onRejected) {
    const nextPromise = new MyPromise((resolve, reject) => {
      if (this.state == FULFILLED) {
        try {
          let lastResolved = onFulfilled(this.value);
          this.resolvePromise(nextPromise, lastResolved, resolve, reject);
        } catch (error) {
          reject(error);
        }
      } else if (this.state == REJECTED) {
        try {
          let lastRejected = onRejected(this.error);
          this.resolvePromise(nextPromise, lastRejected, resolve, reject);
        } catch (error) {
          reject(error);
        }
      } else {
        this.onFulfilledCallbacks.push(() => {
          try {
            let lastResolved = onFulfilled(this.value);
            this.resolvePromise(nextPromise, lastResolved, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let lastRejected = onRejected(this.error);
            this.resolvePromise(nextPromise, lastRejected, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return nextPromise;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
