### ES7特性 ECMAScript 2016
- Array.protoType.includes()

Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似
```
 arr.includes(x) 
 arr.indexOf(x) >= 0
```
区别： 唯一的区别是 includes() 方法能找到 NaN，而 indexOf() 不行

- ** 指数运算符

```
 2**3   //8 (2的3次方)
```

**= (求幂赋值)
```
 b **= 3 => b= b * b * b
```

注意，V8 引擎的指数运算符与Math.pow的实现不相同，对于特别大的运算结果，两者会有细微的差异。