import React from 'react';
import {StyleSheet, View} from 'react-native';
import Loader from '@components/Loader';

const ProgressHUD = ({isLoading = false, bgColor = null}) => {
  return isLoading ? (
    <View style={[styles.container, bgColor && {backgroundColor: bgColor}]}>
      <View style={styles.modalContainer}>
        <Loader />
      </View>
    </View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 1000,
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});

export default ProgressHUD;
