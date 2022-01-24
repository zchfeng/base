# 作用

**用来强制绑定 this 指定的对象**

# 用法

## call

```
fn.call(obj,param1,param2,param3)
```

fn: 函数

obj:指定的对象

param:执行 fn 的参数

## apply

```
fn.apply(obj,[param1,param2,param3])
```

fn: 函数

obj:指定的对象

param:执行 fn 的参数

## call

```
var bindFn = fn.bind(obj)

bindFn(params)
```

fn: 函数

obj:指定的对象

bindFn:绑定 this 后的方法

param:执行 fn 的参数

# 区别

1、call 可接受多个 param，apply 参数使用数组包含起来。bind 不会立即调用函数，而是将函数返回。

2、call 和 apply 通常用作绑定完立即执行的函数中，而 bind 通常用来作用在回调函数中定义。

# 实现

```
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
```

```
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
```

```
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
```
