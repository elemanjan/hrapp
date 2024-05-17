import axios from 'axios';
import {encode as btoa} from 'base-64';
import {auth} from '../../../env.json';
import {AUTH_HOST} from '@config/Urls';

const credentialsAuthBasic = btoa(auth.clientId + ':' + auth.clientSecret);
const AuthService = {
  login(username: string, password: string) {
    const data = new FormData();
    data.append('grant_type', 'password');
    data.append('username', username);
    data.append('password', password);
    return axios.post(`${AUTH_HOST}/oauth2/token`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + credentialsAuthBasic,
      },
    });
  },

  logout(accessToken) {
    const data = new FormData();
    data.append('token', accessToken);
    return axios.post(`${AUTH_HOST}/oauth2/revoke`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + credentialsAuthBasic,
      },
    });
  },

  refreshToken(refreshToken) {
    const data = new FormData();
    data.append('grant_type', 'refresh_token');
    data.append('refresh_token', refreshToken);
    return axios.post(`${AUTH_HOST}/oauth2/token`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + credentialsAuthBasic,
      },
    });
  },
};
export default AuthService;
