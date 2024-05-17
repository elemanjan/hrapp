import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DEFAULT_HEADER} from '@navigation/screenOptions';
import {MANAGER_STACK_NAVIGATION} from '@navigation/screenConstants';
import TaskListScreen from '@screens/Tasks/List';
import TaskDetailScreen from '@screens/Tasks/Detail';
import TaskCreateScreen from '@screens/Tasks/Create';
import UsersListScreen from '@screens/Users/List';
import {ExitButton} from '@navigation/ExitButton';

const Stack = createStackNavigator();

export const ManagerStack = () => (
  <Stack.Navigator screenOptions={DEFAULT_HEADER}>
    <Stack.Screen
      name={MANAGER_STACK_NAVIGATION.LIST}
      component={TaskListScreen}
      options={({navigation}) => ({
        title: 'Список заданий',
        headerRight: () => <ExitButton navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name={MANAGER_STACK_NAVIGATION.USERS}
      component={UsersListScreen}
      options={() => ({
        title: 'Пользователи',
      })}
    />
    <Stack.Screen
      name={MANAGER_STACK_NAVIGATION.DETAIL}
      component={TaskDetailScreen}
      options={() => ({
        title: 'Детали задания',
      })}
    />
    <Stack.Screen
      name={MANAGER_STACK_NAVIGATION.CREATE}
      component={TaskCreateScreen}
      options={() => ({
        title: 'Создать задание',
      })}
    />
  </Stack.Navigator>
);
