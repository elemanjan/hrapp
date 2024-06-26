import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Platform, StatusBar} from 'react-native';
import {observer, Provider} from 'mobx-react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';

import store from './store/index';
import {navigationRef} from '@navigation/NavigationService';
import {PERMISSIONS, request} from 'react-native-permissions';
import notifee from '@notifee/react-native';

const stores = {
  appStore: store.appStore,
};

async function requestUserPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {});
  }
}

async function bootstrap() {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    console.log('Notification caused application to open', initialNotification.notification);
    console.log('Press action used to open the app', initialNotification.pressAction);
  }
}

@observer
class App extends Component {
  componentDidMount() {
    requestUserPermission();
    bootstrap();
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
