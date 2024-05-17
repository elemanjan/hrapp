import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import STRINGS from '@constants/strings';
import {RAISIN_BLACK} from '@styles/colors';
import {SCALE_4} from '@styles/spacing';
import store from '../store';
import {NAVIGATION_AUTH} from '@navigation/screenConstants';

export const ExitButton = ({navigation}) => {
  const {logout} = store.appStore;
  function onPress() {
    logout();
    navigation.replace(NAVIGATION_AUTH);
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{STRINGS.buttons.logout}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCALE_4,
    marginRight: SCALE_4,
  },
  title: {
    fontWeight: '700',
    color: RAISIN_BLACK,
  },
});
