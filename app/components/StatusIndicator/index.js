import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {STATUSES} from '@constants/constants';
import {GRAY_TEXT, GREEN, RED, YELLOW} from '@styles/colors';

export const getStatusStyle = status => {
  switch (status) {
    case STATUSES.new:
      return YELLOW;
    case STATUSES.rejected:
      return RED;
    case STATUSES.accepted:
      return GREEN;
    default:
      return GRAY_TEXT;
  }
};

const StatusIndicator = ({status, containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={require('../../assets/icons/circle.png')}
        style={[styles.icon, {tintColor: getStatusStyle(status)}]}
      />
    </View>
  );
};

StatusIndicator.propTypes = {
  status: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: 'red',
  },
});

export default StatusIndicator;
