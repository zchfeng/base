# 基础类型

#### Number、String、Boolean、Null、undefined、object、symbol、bigint

### 判断数据类型

##### typeof

    typeof 1 // 'number'
    typeof 'sdsd' // 'string'
    typeof true  // 'boolean'
    typeof undefined  // 'undefined'
    typeof null // 'object'
    typeof []  // 'object'
    typeof {}  // 'object'
    typeof NaN // 'number'
    typeof function(){} // 'function'

- 总结：typeof 运算符用于判断对象的类型，但对于一些创建的对象，它们都会返回'objec'

##### instanceof

    object instanceof Object  // true 实例obj在不在Object构造函数中

    console.log(String instanceof String);   //false
    //第一个String的原型链：String=>
    //String.__proto__=>Function.prototype=>Function.prototype.__proto__=>Object.prototype
    //第二个String的原型链：String=>String.prototype

- 总结： instanceof 运算符用来判断一个构造函数的 prototype 属性所指向的对象是否存在另外一个要检测对象的原型链上
- instanceof 的普通的用法，obj instanceof Object 检测 Object.prototype 是否存在于参数 obj 的原型链上。
- 基本类型不生效，不能检测 null 和 undefined

##### constructor、

    [] constructor Array //true
    [] constructor Object //false

- constructor 是每一个实例对象都拥有的属性，而这个属性也相当于是一个指针，它指向于创建当前对象的对象，也就是说 a 的 constructor 指向于 A

##### toString

    Object.prototype.toString.call([]) '[object Array]'

##### isNaN()

    typeof NaN // 'number'
    检测变量是不是NaN  typeof NaN === 'number' && isNaN(nan)
