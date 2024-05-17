/**
 * Возвращает полный линк на картинку
 * @param {string} url
 */
import {IMAGE_SIZE_S} from '@constants/constants';
import store from '@store/index';

export function getImageUrl(url, size) {
  const {baseUrl} = store.authStore;
  try {
    if (url.match(/^http/)) {
      return encodeURI(url);
    }
    let getUrl = url.replace(/download\//, '');
    return size
      ? encodeURI(`${baseUrl.url}${getUrl}/size/${size}`)
      : encodeURI(`${baseUrl.url}${getUrl}/size/${IMAGE_SIZE_S}`);
  } catch (error) {
    return '';
  }
}
