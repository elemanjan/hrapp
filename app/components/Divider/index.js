import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GRAY_LIGHT} from '@styles/colors';

export const Divider = ({containerStyle}) => {
  return <View style={[containerStyle, styles.divider]} />;
};

const styles = StyleSheet.create({
  divider: {
    width: '95%',
    borderTopColor: GRAY_LIGHT,
    borderTopWidth: 1,
  },
});
