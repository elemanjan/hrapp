import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {PermissionsAndroid, Platform, StatusBar} from 'react-native';
import {observer, Provider} from 'mobx-react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';

import store from './store/index';
import {navigationRef} from '@navigation/NavigationService';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

const stores = {
  appStore: store.appStore,
};

async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'Main',
    name: 'Main',
    lights: false,
    vibration: true,
    importance: AndroidImportance.HIGH,
  });
}

async function requestUserPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {});
  }
}

@observer
class App extends Component {
  componentDidMount() {
    console.log('logggg');
    requestUserPermission();
    createNotificationChannel();
  }

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
