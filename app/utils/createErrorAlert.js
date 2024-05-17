import {Alert} from 'react-native';

/**
 * create error alert
 * @param {string | object} error - axios error response data or string
 */

function createErrorAlert(error) {
  let message = '';
  if (typeof error === 'string') {
    message = error;
  } else {
    if (!error.response) {
      message = error.message;
    } else if (typeof error === 'object') {
      if (error.response.status === 500) {
        let detail = `Что-то пошло не так... Error ${error.response?.status}`;
        message = error ? 'Нет интернета' : detail;
      } else if (error.response?.data) {
        if (error.response.data.message) {
          message = error.response.data.message;
        } else {
          let errors = [];
          const errorsValues = Object.values(error.response.data);

          errorsValues.forEach(item => errors.push(...item));
          message = errors[0];
        }
      }
    }
  }

  Alert.alert('Ошибка', message);
}

export default createErrorAlert;
