const MILLISECONDSINDAY = 60 * 60 * 24 * 1000; // 一天的毫秒数
export function plusDays(date, days) {
  const timestamp = date.getTime();
  const targetTimestamp = timestamp + (days * MILLISECONDSINDAY);
  const targetDate = new Date();
  targetDate.setTime(targetTimestamp);
  return targetDate;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
export function format(date, fmt) {
  let formated = fmt;
  const o = {
    'M+': date.getMonth() + 1,               // 月份
    'd+': date.getDate(),                    // 日
    'h+': date.getHours(),                   // 小时
    'm+': date.getMinutes(),                 // 分
    's+': date.getSeconds(),                 // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds(),               // 毫秒
  };
  if (/(y+)/.test(formated)) formated = formated.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  Object.keys(o).forEach((key) => {
    if (new RegExp(`(${key})`).test(formated)) {
      if (key === 'S+') {
        const start = `00${o[key]}`.length - 3;
        formated = formated.replace(RegExp.$1, `00${o[key]}`.substr(start, RegExp.$1.length));
      }
      formated = formated.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[key]) : ((`00${o[key]}`).substr((`${o[key]}`).length)));
    }
  });

  return formated;
}

export function dateToTimestamp(date) {
  return date.getTime() / 1000;
}

export function timestampFormat(timestamp, fmt) {
  const date = new Date(timestamp);
  return format(date, fmt);
}

export function NanoSecToDateTime(nanoSec) {
  if (!nanoSec) {
    return '';
  }

  const str = `20${nanoSec}`.substr(0, 14);
  return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)} ${str.substr(8, 2)}:${str.substr(10, 2)}:${str.substr(12, 2)}`;
}
export function compareDate(d1, d2) {
  return ((new Date(d1.replace(/-/g, '\/'))) < (new Date(d2.replace(/-/g, '\/'))));
}

export default {
  plusDays,
  format,
  dateToTimestamp,
  timestampFormat,
};
