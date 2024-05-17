import store from '@store/index';

/** return user role */
export function getUserRole() {
  try {
    return store.appStore.userRole;
  } catch (e) {
    return 'Unknown';
  }
}
