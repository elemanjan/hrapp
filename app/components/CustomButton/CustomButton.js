import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {GRAY_TEXT, PRIMARY, SEPARATOR_COLOR} from '@styles/colors';

/**
 * Компонент для кнопки в приложении
 * height: scaleSize(40)
 *
 * @param {boolean} disabled - TouchableOpacity disabled
 * @param {string} title - Текст внутри кнопки
 * @param {function} onPress - действие которое происходит после нажатия кнопки
 * @param {string} style - стиль кнопки dark | green | blue | '' - красный
 * @param {object} containerStyles - стиль кнопки
 * @param {object} textStyles - стиль текста кнопки
 * @param {boolean} isOutline - включит outline дизайн кнопки
 * @param {boolean} hide - скрыть кнопку
 */
const CustomButton = ({
  disabled = false,
  title = '',
  onPress = () => null,
  containerStyles = {},
  textStyles = {},
  isOutline = false,
  hide = false,
}) => {
  return hide ? (
    <View />
  ) : (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyles,
        disabled
          ? {
              backgroundColor: SEPARATOR_COLOR,
            }
          : {},
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Text
        numberOfLines={2}
        style={[{...styles.title, ...textStyles}, disabled && {color: GRAY_TEXT}, isOutline && {color: PRIMARY}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
CustomButton.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func,
  containerStyles: PropTypes.object,
  textStyles: PropTypes.object,
  isOutline: PropTypes.bool,
  icon: PropTypes.node,
};
export default CustomButton;
