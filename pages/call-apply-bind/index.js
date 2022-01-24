function myCall(context) {
  // 判断调用这个方法的是不是函数
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

function myApply(context) {
  // 判断调用这个方法的是不是函数
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  context = context || window;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn;
  }
  delete context.fn;
  return result;
}

function myBind(context) {
  // 判断调用这个方法的是不是函数
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  const _this = this;
  const args = [...arguments].slice(1);
  return () => {
    return _this.apply(context, args.concat([...arguments]));
  };
}
