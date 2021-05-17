<!--
 * @Description:
 * @Author: chengfengZeng
 * @Date: 2021-05-17 16:07:20
 * @LastEditors: chengfengZeng
 * @LastEditTime: 2021-05-17 16:52:08
-->

# 单例模式

## 1、定义

`保证一个类只仅有一个实例，并提供一个访问他的全局访问点`

## 2、核心

`确保只有一个实例，并且提供全局访问`

## 3、实现

```
function SetManager(name) {
  this.manager = name;
}

SetManager.prototype.getManager = function () {
  console.log(this.manager);
};

var SingletonSetManager = (function () {
  var manager = null;
  return function (name) {
    if (!manager) {
      manager = new SetManager(name);
    }
    return manager;
  };
})();

SingletonSetManager("a").getManager();
SingletonSetManager("b").getManager();
SingletonSetManager("c").getManager();
```

## 4、优缺点

**优点**

- 单例模式可以保证内存只有一个实例，减少内存的开销
- 可以避免资源的重复占用
- 单例模式设置全局访问点、可以优化和共享资源的访问

**确定**

- 单例模式一般没有接口，扩展困难
- 在并发测试中，单例模式不利于代码调试。
- 单例模式的功能通常写在一个类中，如果功能设计不合理，则很容易违背单一职责原则
