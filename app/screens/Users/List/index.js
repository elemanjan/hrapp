import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '@styles/commonStyles';
import ProgressHUD from '@components/ProgressHUD';
import {WHITE} from '@styles/colors';
import store from '@store/index';
import {ADMIN_STACK_NAVIGATION, MANAGER_STACK_NAVIGATION} from '@navigation/screenConstants';
import {SCALE_16} from '@styles/spacing';
import {Colors} from '@styles/index';
import {FONT_BOLD} from '@styles/typography';
import STRINGS from '@constants/strings';
import {BottomButton} from '@screens/components/BottomButton/BottomButton';
import {EmptyItems} from '@screens/components/EmptyItems';
import {observer} from 'mobx-react';
import {ListItemView} from '@screens/components/ListItemView';

const UsersListScreen = ({navigation, route}) => {
  const {isLoading, users, setValue, clearCreateUser} = store.appStore;
  const isFromTask = route.params?.isFromTask;
  const navigateToCreate = () => {
    clearCreateUser();
    navigation.navigate(ADMIN_STACK_NAVIGATION.CREATE);
  };
  const handleNavigate = user => {
    setValue('userId', user.id);
    setValue('login', user.login);
    setValue('email', user.email);
    setValue('firstName', user.name);
    setValue('password', user.password);
    setValue('selectedUser', user);
    if (isFromTask) {
      navigation.navigate(MANAGER_STACK_NAVIGATION.CREATE);
    } else {
      navigation.navigate(ADMIN_STACK_NAVIGATION.DETAIL);
    }
  };

  const renderItem = ({item}) => (
    <ListItemView title={item.name} subTitle={item.email} onPress={() => handleNavigate(item)} />
  );

  return (
    <SafeAreaView edges={['left', 'right']} style={[commonStyles.container]}>
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{paddingTop: 20, paddingBottom: 100}}
        />
        {!isFromTask && <BottomButton title={STRINGS.buttons.createUser} onPress={navigateToCreate} />}
        {users.length === 0 && <EmptyItems textOnly text={STRINGS.alertInfo.emptyUsers} />}
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
  inputWrapContainer: {
    height: '60%',
    paddingBottom: 5,
  },
  inputContainer: {
    paddingTop: SCALE_16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  textContainer: {
    height: '40%',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: Colors.BLACK_TEXT,
    ...FONT_BOLD,
  },
});

export default observer(UsersListScreen);
