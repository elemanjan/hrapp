import React from 'react';
import {NAVIGATION_APP, NAVIGATION_AUTH} from './screenConstants';
import {createStackNavigator} from '@react-navigation/stack';
import {CARD_STYLE_INTERPOLATORS, HEADER_NONE} from './screenOptions';
import LoginScreen from '@screens/Login';
import {AppLoadingScreen} from '@screens/AppLoadingScreen';
import AppNavigator from '@navigation/AppNavigator';
import {RAISIN_BLACK} from '@styles/colors';
import {View, Platform} from 'react-native';

const Stack = createStackNavigator();
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...CARD_STYLE_INTERPOLATORS,
      }}>
      <Stack.Screen
        options={{
          ...HEADER_NONE,
          animationEnabled: false,
        }}
        name="AppLoading"
        component={AppLoadingScreen}
      />
      <Stack.Screen
        options={{
          ...HEADER_NONE,
          animationEnabled: false,
        }}
        name={NAVIGATION_AUTH}
        component={LoginScreen}
      />
      <Stack.Screen
        name={NAVIGATION_APP}
        options={{
          header: () => (Platform.OS === 'ios' ? <View style={{backgroundColor: RAISIN_BLACK, height: 32}} /> : null),
        }}
        component={AppNavigator}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
