import {Alert} from 'react-native';

/**
 * @param {string} message - this is message of alert
 */
function createEmptyAlert(message) {
  Alert.alert('', message);
}

export default createEmptyAlert;
