import datefnsFormat from 'date-fns/format';
import {ru} from 'date-fns/locale';

export default function format(date, formatStr = 'dd-MM-yyyy') {
  let dt;
  try {
    if (typeof date === 'string') {
      dt = new Date(date);
    } else {
      dt = date;
    }
    return datefnsFormat(dt, formatStr, {
      locale: ru,
    });
  } catch (e) {
    return '---';
  }
}
