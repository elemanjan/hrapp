import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GRAY_MEDIUM, GRAY_TEXT, PRIMARY, RAISIN_BLACK, WHITE} from '@styles/colors';
import StatusIndicator, {getStatusStyle} from '@components/StatusIndicator';

export const ListItemView = ({title, subTitle, thirdTitle, onPress, status}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title ?? ''}
        </Text>
        {subTitle ? (
          <Text numberOfLines={2} style={styles.subTitle}>
            {subTitle}
          </Text>
        ) : null}
        {thirdTitle ? (
          <Text numberOfLines={1} style={[styles.thirdTitle, {color: getStatusStyle(status)}]}>
            {thirdTitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.iconContainer}>
        <StatusIndicator status={status} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GRAY_MEDIUM,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 10,
  },
  textContainer: {
    width: '90%',
  },
  iconContainer: {
    width: '10%',
    alignItems: 'flex-end',
  },
  title: {
    color: RAISIN_BLACK,
    fontWeight: '600',
  },
  subTitle: {
    color: GRAY_TEXT,
  },
  thirdTitle: {
    color: PRIMARY,
  },
});
