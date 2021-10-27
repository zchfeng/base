const hours = 1000 * 60 * 60;
const days = hours * 24;
const weeks = days * 7;
const UNIT_TO_NUM = { hours, days, weeks };

class Duration {
  constructor(num, unit) {
    this.number = num;
    this.unit = unit;
  }
  toNumber() {
    return UNIT_TO_NUM[this.unit] * this.number;
  }
  get ago() {
    return new Date(Date.now() - this.toNumber());
  }
  get later() {
    return new Date(Date.now() + this.toNumber());
  }
}

// 遍历单位常量
Object.keys(UNIT_TO_NUM).forEach((unit) => {
  // 检测数字类型，给数字增加'hours','days', 'weeks'属性，属性返回Duration
  Object.defineProperty(Number.prototype, unit, {
    get() {
      return new Duration(this, unit);
    },
  });
});
