import AxiosAPI from './AxiosApi';
import {AUTH_HOST} from '@config/Urls';

const AccountService = {
  getUser() {
    return AxiosAPI.get('/api/accounts/me');
  },
  getUserFromAuth() {
    return AxiosAPI.get(`${AUTH_HOST}/api/accounts/me`);
  },
  updateUser(params) {
    return AxiosAPI.put('/api/accounts/update-profile/', params);
  },
  getResources() {
    return AxiosAPI.post(`${AUTH_HOST}/api/resources/doSearch`, {});
  },
};
export default AccountService;
