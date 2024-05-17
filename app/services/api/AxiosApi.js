import axios from 'axios';
import store from '@store/index';
import AuthService from '@services/api/AuthService';
import {navigate} from '@navigation/NavigationService';
import {NAVIGATION_AUTH_MAIN} from '@navigation/screenConstants';

const AxiosAPI = axios.create({});

AxiosAPI.interceptors.request.use(
  request => {
    // console.log('AXIOS request', JSON.stringify(request));
    if (request.headers) {
      request.baseURL = store.authStore.baseUrl.url;
      request.headers.Authorization = `Bearer ${store.authStore.access_token}`;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);
const handleError = async error => {
  try {
    store.authStore.clearStores();
    store.authStore.setToken(null, null);
    navigate(NAVIGATION_AUTH_MAIN);
  } catch (e) {}
};

const getRefreshToken = async () => {
  try {
    const response = await AuthService.refreshToken(store.authStore.refresh_token);
    const {access_token, refresh_token: newRefreshToken} = response.data;
    store.authStore.setToken(access_token, newRefreshToken);
  } catch (e) {
    handleError(e);
  }
};

// Response interceptor for API calls
AxiosAPI.interceptors.response.use(
  async response => {
    // console.log('AXIOS response:', JSON.stringify(response));
    return response;
  },
  async error => {
    const originalRequest = error.config;
    // console.log('error response status', error.response);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await getRefreshToken();
      return AxiosAPI(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default AxiosAPI;
