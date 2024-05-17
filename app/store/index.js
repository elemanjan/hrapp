import {create} from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStore from './AppStore';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

/**
 * This is Main Store
 */

export class MainStore {
  constructor() {
    this.appStore = new AppStore(this);

    Promise.all([hydrate('app', this.appStore), hydrate('app', this.appStore)]);
  }
}

export const store = new MainStore();
export default store;
