export function numberLimit(value, border = 0) {      // 控制只能输入正整数
  const regStrs = [
    ['^0(\\d+)$', '$1'], // 禁止录入整数部分两位以上，但首位为0
    ['[^\\d]+', ''], // 禁止录入任何非数字
  ];

  regStrs.forEach((item) => {
    const reg = new RegExp(item[0]);
    value = value.replace(reg, item[1]);
  });
  if (border) {
    return parseInt(value, 10) > border ? border.toString() : value;
  }
  return value;
}

// 控制小数输入并限制位数
export function floatLimit(value, bit) {   // 控制输入价格
  value = value.toString();
  const regStrs = [
    ['^0(\\d+)$', '$1'], // 禁止录入整数部分两位以上，但首位为0
    ['[^\\d\\.]+', ''], // 禁止录入任何非数字和点
    ['\\.(\\d?)\\.+', '.$1'], // 禁止录入两个以上的点
    [`^(\\d+\\.\\d{${bit}}).+`, '$1'], // 禁止录入小数点后n位以上
  ];
  regStrs.forEach((item) => {
    const reg = new RegExp(item[0]);
    value = value.replace(reg, item[1]);
  });
  return value;
}

export default {};
