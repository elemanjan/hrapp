import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GRAY_DARK} from '@styles/colors';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const EmptyItems = ({text, textOnly, iconName = 'cloud-search-outline'}) => {
  return (
    <View style={styles.container}>
      {!textOnly && <MaterialCommunityIcons name={iconName} size={60} color={GRAY_DARK} allowFontScaling />}
      <Text style={[styles.title, textOnly && {fontWeight: '500'}]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
    fontWeight: '500',
    color: GRAY_DARK,
  },
});

EmptyItems.propTypes = {
  text: PropTypes.string,
  textOnly: PropTypes.bool,
};

EmptyItems.defaultProps = {
  text: '',
  textOnly: false,
};
