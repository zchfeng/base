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

// 提取出通用的单例
function getSingleton(fn) {
  var instance = null;

  return function () {
    if (!instance) {
      instance = fn.apply(this, arguments);
    }

    return instance;
  };
}

var managerSingleton = getSingleton(function (name) {
  var manager = new SetManager(name);
  return manager;
});

managerSingleton("aaa").getManager();
managerSingleton("bbbb").getManager();
managerSingleton("cccc").getManager();

function SetHr(name) {
  this.hr = name;
}

SetHr.prototype.getName = function () {
  console.log(this.hr);
};

var hrSingleton = getSingleton(function (name) {
  var hr = new SetHr(name);
  return hr;
});

hrSingleton("zzz").getName();
hrSingleton("xxx").getName();
hrSingleton("ccc").getName();
