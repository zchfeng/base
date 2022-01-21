// 在promise外部触发promise
// 应用场景：一个异步由外部(可以是方法也可以是异步)决定输出结果和输出时间
// 例1：页面上报：每个页面可能存在异步信息。一个异步获取异步信息，一个异步确保信息完整是更新信息

let resolves = {};

// <---      方法1    ---->
for (let index = 0; index < 5; index++) {
  new Promise((resolve) => {
    resolves[`resolve${index}`] = resolve;
    console.log(resolve, "111");
  }).then((data) => {
    console.log(data, "then111");
  });
}

for (let index = 4; index >= 0; index--) {
  setTimeout(() => {
    resolves?.[`resolve${index}`](`setTimeout${index}`);
  }, 1000);
}

for (let index = 4; index >= 0; index--) {
  Promise.resolve(resolves?.[`resolve${index}`](`Promise${index}`));
}
