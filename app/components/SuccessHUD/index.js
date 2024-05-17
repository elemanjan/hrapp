import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WHITE} from '@styles/colors';

const SuccessHUD = ({isHidden = true, title = 'Успешно'}) => {
  return isHidden ? (
    <View />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 16,
  },
});

export default SuccessHUD;
