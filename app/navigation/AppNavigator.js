import React from 'react';
import {getUserRole} from '@utils/getUserRole';
import {AdminStack} from '@navigation/ScreenStacks/AdminStack';
import {UserStack} from '@navigation/ScreenStacks/UserStack';
import {ManagerStack} from '@navigation/ScreenStacks/ManagerStack';
import {View} from 'react-native';
import {observer} from 'mobx-react';

const AppNavigator = () => {
  const role = getUserRole();
  switch (role) {
    case 'user': {
      return <UserStack />;
    }
    case 'admin': {
      return <AdminStack />;
    }
    case 'manager': {
      return <ManagerStack />;
    }
    default: {
      return <View style={{flex: 1}} />;
    }
  }
};

export default observer(AppNavigator);
