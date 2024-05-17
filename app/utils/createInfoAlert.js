import {Alert} from 'react-native';

/**
 * @param {string} message - this is message of alert
 */
function createInfoAlert(message) {
  Alert.alert('', message);
}

export default createInfoAlert;
