### new 的实现及立即

- new  
  new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

```
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);
// expected output: "Eagle"
```

- 1、new 关键字会首先创建一个空对象
- 2、将这个空对象的原型对象指向构造函数的原型属性，从而继承原型上的方法
- 3、将 this 指向这个空对象，执行构造函数中的代码，以获取私有属性
- 4、如果构造函数返回了一个对象 res，就将该返回值 res 返回，如果返回值不是对象，就将创建的对象返回理解了 new 的原理，手动实现就很简单了.

```
function objectFactory() {
  var obj = {}, //1.创建一个空对象，
    // 构造函数并继承传参
    Constructor = [].shift.call(arguments);
  // 将对象的__proto__指向构造函数的prototype 这里我两步一起做了
  obj.__proto__ = Constructor.prototype;
  // 将构造函数中的this指向obj，执行构造函数代码,获取返回值
  var ret = Constructor.apply(obj, arguments);

  return typeof ret === "object" ? ret : obj;
}

```

[js 实现方式](https://github.com/zchfeng/js-base/tree/master/pages/new/index.js)
