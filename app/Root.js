import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {observer, Provider} from 'mobx-react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';

import store from './store/index';
import {navigationRef} from '@navigation/NavigationService';

const stores = {
  authStore: store.authStore,
  ordersStore: store.ordersStore,
  appStore: store.appStore,
};

@observer
class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <MainNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App;
