import React from 'react';
import {View} from 'react-native';
import store from '@store/index';
import {NAVIGATION_APP, NAVIGATION_AUTH} from '@navigation/screenConstants';
import commonStyles from '@styles/commonStyles';
import {observer} from 'mobx-react';
import {isEmpty} from 'lodash';

export const AppLoadingScreen = observer(({navigation}) => {
  const {activeUser} = store.appStore;
  if (!isEmpty(activeUser)) {
    navigation.replace(NAVIGATION_APP);
  } else {
    navigation.replace(NAVIGATION_AUTH);
  }

  return <View style={commonStyles.container} />;
});
