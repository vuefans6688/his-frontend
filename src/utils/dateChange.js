/*
  将日期yyyymmdd转化成日期对象
 （支持8位 14位 ）
*/
import { jsTimestampFilter } from '@/utils/filters';

export default function (val) {
  val += '';
  let date = '';
  if (val.length === 8) {
    date = val.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
  } else if (val.length === 14) {
    date = val.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3 $4:$5:$6');
  } else {
    return jsTimestampFilter(new Date());
  }
  return date;
}

