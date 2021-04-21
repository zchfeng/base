function MyNew() {
  let obj = {}; // 生成一个空的对象
  obj._proto_ = this.prototype; // 将新对象的proto连接到类的原型上
  this.call(obj); // 通过将新对象作为上下文（this）
  return obj;
}

//因为new是关键字,我用函数的形式来实现，可以将构造函数和构造函数的参数传入
function myNew(Fn, ...args) {
  //1.创建一个空对象，并将对象的__proto__指向构造函数的prototype 这里我两步一起做了
  const obj = Object.create(Fn.prototype);
  //2.将构造函数中的this指向obj，执行构造函数代码,获取返回值
  const res = Fn.apply(obj, args);
  //3.判断返回值类型
  return res instanceof Object ? res : obj;
}

function objectFactory() {
  var obj = new Object(),
    Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  var ret = Constructor.apply(obj, arguments);

  return typeof ret === "object" ? ret : obj;
}
