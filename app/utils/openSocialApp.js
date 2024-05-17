import {Linking} from 'react-native';
import Toast from 'react-native-toast-message';

const showToast = () => {
  Toast.show({
    type: 'info',
    text1: 'Номер телефона не добавлен',
  });
};
/**
 * Принимает номер телефона и тип кнопки ('whatsapp' или 'phone'), если номер нет, то выводит сообщение, если номер есть, то открывает нужную программу.
 * @param buttonName
 * @param phoneNumber
 */
export const openAppByPhoneNumber = (buttonName, phoneNumber) => {
  if (!phoneNumber) {
    showToast();
  } else if (buttonName === 'whatsapp') {
    Linking.openURL(`whatsapp://send?text=&phone=${phoneNumber}`);
  } else if (buttonName === 'phone') {
    Linking.openURL(`tel:${phoneNumber}`);
  }
};

/**
 * Принимает ссылку на программу и открывает ее.
 * @param link
 */
export const openSocialAppByLink = link => {
  Linking.openURL(link);
};
