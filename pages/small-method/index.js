/** 获取浏览器Cookie的值 **/
// 通过document.cookie 来查找cookie值
const cookie = (name) =>
  `; ${document.cookie}`.split(`; ${name}=`).pop().split(";").shift();

/* 颜色RGB转十六进制*/
const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(0, 51, 255);

/* 复制到剪贴板 */
// 借助navigator.clipboard.writeText可以很容易的讲文本复制到剪贴板
const copyToClipboard = (text) => navigator.clipboard.writeText(text);

copyToClipboard("Hello World");

/* 检查日期是否合法 */
// 使用以下代码段检查给定日期是否有效。
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

isDateValid("December 17, 1995 03:24:00");

/* 查找日期位于一年中的第几天 */
const dayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

dayOfYear(new Date());

/* 英文字符串首字母大写 */
// Javascript没有内置的首字母大写函数，因此我们可以使用以下代码。
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

capitalize("follow for more");

/* 计算2个日期之间相差多少天 */
const dayDif = (date1, date2) =>
  Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

dayDif(new Date("2020-10-21"), new Date("2021-10-22"));

/* 清除全部Cookie */
// 通过使用document.cookie访问cookie并将其清除，可以轻松清除网页中存储的所有cookie。
const clearCookies = document.cookie
  .split(";")
  .forEach(
    (cookie) =>
      (document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
  );

/* 生成随机十六进制颜色 */
// 可以使用 Math.random 和 padEnd 属性生成随机的十六进制颜色。
const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;

console.log(randomHex());

/* 数组去重 */
// 可以使用 JavaScript 中的Set轻松删除重复项
const removeDuplicates = (arr) => [...new Set(arr)];

console.log(removeDuplicates([1, 2, 3, 3, 4, 4, 5, 5, 6]));

/* 从 URL 获取查询参数 */
// 可以通过传递 window.location 或原始 URL goole.com?search=easy&page=3 轻松地从 url 检索查询参数
const getParameters = (URL) => {
  URL = JSON.parse(
    '{"' +
      decodeURI(URL.split("?")[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  return JSON.stringify(URL);
};

getParameters(window.location);

Object.fromEntries(new URLSearchParams(window.location.search));
