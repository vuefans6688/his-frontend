import * as dateUtils from './dateUtils';


export function enableStatusFilter(status) {
  return status === 0 ? '可用' : '不可用';
}

export function sexFilter(status) {
  if (status === 1) {
    return '男';
  } else if (status === 2) {
    return '女';
  }
  return '-';
}

export function priceFilter(price) {
  const priceNumber = parseFloat(price);
  if (isNaN(priceNumber)) return '';
  return priceNumber.toFixed(2);
}

export function undefineFilter(str) {
  return str !== '' ? str : '-';
}

/* eslint no-bitwise:["error", { "allow": ["~"] }] */
export function ageFilter(dateString) {
  const birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

export function jsTimestampFilter(timestamp, parttern = 'yyyy-MM-dd') {
  if (!timestamp) {
    return '';
  }
  if (typeof timestamp === 'object') {
    return timestamp.format('yyyy-MM-dd');
  }
  const formatedtimestamp = parseInt(timestamp, 10);
  if (isNaN(formatedtimestamp)) return '';

  const day = new Date(formatedtimestamp);
  return dateUtils.format(day, parttern);
}

export function unixTimestampFilter(timestamp, parttern) {
  const formatedtimestamp = parseInt(timestamp, 10);

  if (isNaN(formatedtimestamp)) return '';
  return jsTimestampFilter(formatedtimestamp * 1000, parttern);
}
// yyyy-mm-dd
export function dateTimeFilter(nanoSec) {
  if (!nanoSec) {
    return '';
  }

  const str = `20${nanoSec}`.substr(0, 8);
  return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)} ${str.substr(8, 2)}`;
}
// 末尾补0
export function paddingEndZero(value, len) {
  // 避免出现.00情况的判断
  if (value || value === 0) {
    let newValue = value + '';
    if (newValue.indexOf('.') === -1) {
      newValue += '.';
    }
    for (let i = 0; i < len; i++) {
      newValue += '0';
    }
    const index = newValue.indexOf('.');
    return newValue.substr(0, index + len + 1);
  }
}

export default {};
