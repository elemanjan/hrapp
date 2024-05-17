import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DEFAULT_HEADER} from '@navigation/screenOptions';
import {ADMIN_STACK_NAVIGATION} from '@navigation/screenConstants';
import UsersListScreen from '@screens/Users/List';
import UserDetailScreen from '@screens/Users/Detail';
import UserCreateScreen from '@screens/Users/Create';
import {ExitButton} from '@navigation/ExitButton';

const Stack = createStackNavigator();

export const AdminStack = () => (
  <Stack.Navigator screenOptions={DEFAULT_HEADER}>
    <Stack.Screen
      name={ADMIN_STACK_NAVIGATION.LIST}
      component={UsersListScreen}
      options={({navigation}) => ({
        title: 'Пользователи',
        headerRight: () => <ExitButton navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name={ADMIN_STACK_NAVIGATION.DETAIL}
      component={UserDetailScreen}
      options={() => ({
        title: 'Детали пользователя',
      })}
    />
    <Stack.Screen
      name={ADMIN_STACK_NAVIGATION.CREATE}
      component={UserCreateScreen}
      options={() => ({
        title: 'Создать пользователя',
      })}
    />
  </Stack.Navigator>
);
