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
