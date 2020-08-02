### ES8特性
- Object.values()

返回对象属性值
```
    Object.values({a:1,b:2,c:3}) // [1,2,3]
```

- Object.entries()
```
    Object.entries({a:1,b:2,c:3}) 
    // [['a',1],['b',2],['c',3]]
```

- padStart()
可以在字符串前面填充指定的字符串

```
 '123'.padStart(10)  
  // '       123' 
 '123'.padStart(10,'*')  // '*******123'
```

- padEnd()
 
可以在字符串后面填充指定的字符串


- Async/Await

Async/Await使得异步代码看起来像同步代码
