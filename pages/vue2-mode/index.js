class Vue {
  constructor(options = {}) {
    // 1. 保存创建Vue实例时传递的options
    this.$options = options;
    this.$data = options.data || {};
    // options.el是选择器或者DOM对象
    // this.$el =
    //   typeof options.el === "string"
    //     ? document.querySelector(options.el)
    //     : options.el;
    // 2. 把Data中的成员转换成get和set
    this._ProxyData(this.$data);
    // 3. observer对象，监听data数据的变化
    // new Observer(this.$data);
    // 4. 调用compile函数，解析指令和差值表达式
    // new Compiler(this);
  }

  // 注册数据的getter和setter方法
  _ProxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          console.log("get", data[key]);
          return data[key];
        },
        set(newValue) {
          console.log("set", newValue);
          if (newValue === data[key]) {
            return;
          }
          data[key] = newValue;
        },
      });
    });
  }
}

const vm = new Vue({
  data: {
    count: 1,
    message: "hello",
    obj: "<p>hello</p>",
    input: "222",
  },
});
console.log(vm.$data.count + 1);
