import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from '@components/CustomButton';

export const BottomButton = ({title, onPress, containerStyles}) => (
  <View style={[styles.bottomButtonContainer, containerStyles]}>
    <CustomButton title={title} onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
