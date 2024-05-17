import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {scaleSize} from '@styles/mixins';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextField from '@components/TextField';
import {format} from 'date-fns';

/**
 * @param {Date} dt - Дата
 * @param {string} formatStr - Шаблон
 * @returns string
 */
function getFormatedDate(dt, formatStr = 'dd-MM-yyyy') {
  try {
    return format(dt, formatStr);
  } catch (e) {
    return format(new Date(), formatStr);
  }
}

/** Нативный календарь */
export function DatePicker({mode, onChange, value, min, max}) {
  const [isVisible, setVisible] = useState(false);
  const selectDate = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    onChange(new Date(currentDate));
    setVisible(false);
  };
  return (
    <View style={styles.field}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <TextField value={getFormatedDate(value)} editable={false} />
      </TouchableOpacity>
      {isVisible && (
        <DateTimePicker
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={selectDate}
          value={value || new Date()}
          minimumDate={min}
          maximumDate={max}
        />
      )}
    </View>
  );
}

DatePicker.defaultProps = {
  mode: 'date',
  min: undefined,
  max: undefined,
};

const styles = StyleSheet.create({
  field: {
    width: scaleSize(100),
  },
});
