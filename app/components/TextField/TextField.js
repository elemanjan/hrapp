import React, {forwardRef} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';
import {GRAY} from '@styles/colors';
import PropTypes from 'prop-types';
import {Colors} from '@styles/';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {scaleSize} from '@styles/mixins';

/**
 * Поле для ввода
 * @param {boolean} withError - показывать ошибку или нет
 * @param {string} error - текст ошибки
 * @param {string} label - название поля
 * @param {object} containerStyles - стили контейнера
 * @param {object} inputStyles - стили input
 * @param {Function} onChangeText - действие при изменение текста
 */
const TextField = forwardRef(
  (
    {
      value,
      onFocus,
      onEndEditing,
      withError,
      error,
      label,
      containerStyles,
      inputStyles,
      onChangeText,
      icon,
      iconPress,
      ...inputProps
    },
    ref,
  ) => {
    return (
      <View style={[styles.inputContainer, containerStyles]}>
        {label ? (
          <View style={styles.label}>
            <Text style={styles.labelText}>{label}</Text>
          </View>
        ) : null}

        <View
          style={[
            styles.inputField,
            error ? styles.errorBorder : {},
            icon
              ? {
                  paddingRight: scaleSize(50),
                }
              : {},
          ]}>
          <TextInput
            style={[styles.input, inputStyles]}
            value={value}
            placeholderTextColor={GRAY}
            onChangeText={onChangeText}
            selectionColor={Colors.RED}
            onFocus={onFocus}
            onEndEditing={onEndEditing}
            ref={ref}
            {...inputProps}
          />
          {icon ? (
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={iconPress}>
                {icon}
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {withError && (
          <View style={styles.errorContainer}>{!!error && <Text style={styles.errorText}>{error}</Text>}</View>
        )}
      </View>
    );
  },
);

TextField.propTypes = {
  label: PropTypes.string,
  containerStyles: PropTypes.object,
  onChangeText: PropTypes.func,
  value: PropTypes.any,
  icon: PropTypes.element,
};
TextField.defaultProps = {
  label: '',
  containerStyles: {},
};

export default TextField;
