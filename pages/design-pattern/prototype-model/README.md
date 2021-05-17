<!--
 * @Description:
 * @Author: chengfengZeng
 * @Date: 2021-05-17 17:26:44
 * @LastEditors: chengfengZeng
 * @LastEditTime: 2021-05-17 17:35:45
-->

# 原型模式

## 定义

` 用一个已经创建好的实例作为原型，通过复制该原型对象来创建一个和原型相同或相似的新对象`

```
var prototype = {
    name:'jack',
    getName:function(){
        return this.name
    }
}

var obj = Object.create(prototype,{
    job:{
        value:'IT'
    }
})

console.log(obj.getName);
console.log(obj.job);
console.log(obj.__proto__ === prototype);

```

## 优缺点

**优点**

- 在性能上比 new 一个对象更优良
- 可以使用深克隆方式保存对象的状态，使用原型模式将对象复制一份，并将其状态保存起来，简化了创建对象的过程，以便在需要的时候使用（例如恢复到历史某一状态），可辅助实现撤销操作。

**缺点**

- 需要给每个类都配置 clone 方法
