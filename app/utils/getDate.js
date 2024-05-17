import format from '@utils/format';
import {endOfDay, startOfDay} from 'date-fns';

const getDate = dt => {
  try {
    if (dt) {
      if (typeof dt === 'string') {
        dt = new Date(dt);
      }
      return format(dt, 'dd.MM.yyyy HH:mm');
    } else {
      return '---';
    }
  } catch (error) {
    return '---';
  }
};

export default getDate;

/**
 * Функция принимает дату и конвертирует его по UTC
 * @returns {Date}
 */
export const getUTCDate = dt => {
  return new Date(
    Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds()),
  );
};

export const isDatePast = receiptDate => {
  try {
    let today = new Date().getTime();
    // console.log('today', today);
    let dt = receiptDate && receiptDate[receiptDate.length - 1];
    if (dt === 'Z') {
      dt = receiptDate;
    } else {
      dt = receiptDate + 'Z';
    }
    let rDate = new Date(dt).getTime();
    // console.log('rDate', rDate);
    if (rDate) {
      return today >= rDate;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
/**
 * Function return start of today's date by local time zone
 * @param date
 * @returns {Date}
 */
export const getStartDay = date => {
  return getUTCDate(startOfDay(date));
};

/**
 * Function return end of today's date by local time zone
 * @param date
 * @returns {Date}
 */
export const getEndDay = date => {
  return getUTCDate(endOfDay(date));
};
