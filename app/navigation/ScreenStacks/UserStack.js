import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DEFAULT_HEADER} from '@navigation/screenOptions';
import {USER_STACK_NAVIGATION} from '@navigation/screenConstants';
import TaskListScreen from '@screens/Tasks/List';
import TaskDetailScreen from '@screens/Tasks/Detail';
import TaskCreateScreen from '@screens/Tasks/Create';
import {ExitButton} from '@navigation/ExitButton';

const Stack = createStackNavigator();

export const UserStack = () => (
  <Stack.Navigator screenOptions={DEFAULT_HEADER}>
    <Stack.Screen
      name={USER_STACK_NAVIGATION.LIST}
      component={TaskListScreen}
      options={({navigation}) => ({
        title: 'Список заданий',
        headerRight: () => <ExitButton navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name={USER_STACK_NAVIGATION.DETAIL}
      component={TaskDetailScreen}
      options={() => ({
        title: 'Детали задания',
      })}
    />
    <Stack.Screen
      name={USER_STACK_NAVIGATION.CREATE_TASK}
      component={TaskCreateScreen}
      options={() => ({
        title: 'Создать задание',
      })}
    />
  </Stack.Navigator>
);
