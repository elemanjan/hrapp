import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '@styles/commonStyles';
import ProgressHUD from '@components/ProgressHUD';
import {WHITE} from '@styles/colors';
import store from '@store/index';
import {MANAGER_STACK_NAVIGATION, USER_STACK_NAVIGATION} from '@navigation/screenConstants';
import STRINGS from '@constants/strings';
import {ListItemView} from '@screens/components/ListItemView';
import {BottomButton} from '@screens/components/BottomButton/BottomButton';
import {EmptyItems} from '@screens/components/EmptyItems';
import {observer} from 'mobx-react';
import {getUserRole} from '@utils/getUserRole';

const TaskListScreen = ({navigation}) => {
  const {isLoading, tasks, setValue, filteredTasks, clearCreateTask} = store.appStore;
  const isUser = getUserRole() === 'user';

  const navigateToCreate = () => {
    clearCreateTask();
    navigation.navigate(MANAGER_STACK_NAVIGATION.USERS, {isFromTask: true});
  };

  const navigateToDetail = task => {
    setValue('taskId', task.id);
    setValue('taskStatus', task.status);
    setValue('taskTitle', task.title);
    setValue('taskDescription', task.description);
    setValue('userTaskDescription', task.userTaskDescription);
    setValue('taskFile', task.taskFile);
    setValue('userTaskFile', task.userTaskFile);
    setValue('firstName', task.userName);
    setValue('userId', task.userId);
    if (isUser) {
      navigation.navigate(USER_STACK_NAVIGATION.DETAIL);
    } else {
      navigation.navigate(MANAGER_STACK_NAVIGATION.DETAIL);
    }
  };

  const renderItem = ({item}) => (
    <ListItemView
      title={item.title}
      subTitle={item.description}
      thirdTitle={item.status}
      onPress={() => navigateToDetail(item)}
    />
  );

  return (
    <SafeAreaView edges={['left', 'right']} style={[commonStyles.container]}>
      <View style={styles.container}>
        <FlatList
          data={getUserRole() === 'user' ? filteredTasks : tasks}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{paddingTop: 20, paddingBottom: 100}}
        />
        {!isUser && <BottomButton title={STRINGS.buttons.createTask} onPress={navigateToCreate} />}
        {tasks.length === 0 && <EmptyItems textOnly text={STRINGS.alertInfo.emptyTasks} />}
      </View>
      <ProgressHUD isLoading={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default observer(TaskListScreen);
