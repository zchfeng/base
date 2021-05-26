# 策略模式

## 1、定义

`定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换`

## 2、核心

将算法的使用和算法的实现分离开来  
一个基于策略模式的程序至少有两部分组成  
第一部分是一组策略类，策略类封装了具体的算发，并负责具体的计算过程
第二部分是环境类 Content,Content 接受客户的请求，随后把请求委托给莫格策略类。要做到这点，说明 Content 中要维持对某个策略对象的引用

## 3、实现

```
const fnA = function (val) {
  return val * 1;
};

const fnB = function (val) {
  return val * 2;
};

const fnC = function (val) {
  return val * 3;
};

const calculate = function (fn, val) {
  return fn(val);
};

console.log(calculate(fnA, 100));
console.log(calculate(fnB, 100));

```

## 4、优缺点

**优点**  
可以有效的避免多重条件语句，将一系列方法封装起来也更直观，利于维护

**缺点**  
往往策略集会比较多，我们需要先就了解定义好所有的情况
