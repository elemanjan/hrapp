import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import format from '@utils/format';
import {observer} from 'mobx-react';
import TextField from '@components/TextField';
import PropTypes from 'prop-types';
import {SCALE_20} from '@styles/spacing';
import DatePicker from 'react-native-date-picker';

/**
 * Выбор даты по и до, используется в фильтрах
 */

const CustomDatePicker = ({dt, onChangeDate, placeholder, isEditable = true}) => {
  /**
   * Date picker
   */
  const [date, setDate] = useState(dt ? new Date(dt) : new Date());
  const [open, setOpen] = useState(false);

  /**
   * Render "date" to YYYY-MM-DD
   * @return {string} - date
   */

  useEffect(() => {
    onChangeDt();
  }, [date]);

  const onChangeDt = () => {
    onChangeDate(date ? date : '');
  };

  function handleOpen() {
    if (isEditable) {
      setOpen(true);
    }
  }

  return (
    <>
      <View style={styles.datePicker}>
        <Pressable style={[styles.datePickerItem]} onPress={handleOpen}>
          <TextField
            editable={false}
            placeholder={placeholder}
            value={date ? `${format(date, 'dd-MMMM-yyyy')} | ${date.toLocaleTimeString()}` : ''}
            pointerEvents="none"
          />
        </Pressable>
      </View>

      <DatePicker
        minimumDate={new Date()}
        modal
        locale={'ru-RU'}
        open={open}
        mode={'datetime'}
        date={date}
        onConfirm={dt => {
          setOpen(false);
          setDate(dt);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        title="Выберите дату"
        confirmText="Ок"
        cancelText="Отмена"
        theme={'light'}
      />
    </>
  );
};

CustomDatePicker.propTypes = {
  onChangeDate: PropTypes.func,
  placeholder: PropTypes.string,
};

CustomDatePicker.defaultProps = {
  placeholder: 'Выберите дату',
  date: new Date(),
};

const styles = StyleSheet.create({
  datePicker: {
    flexDirection: 'row',
    marginBottom: SCALE_20,
  },
  datePickerItem: {
    flex: 1,
  },
});

export default observer(CustomDatePicker);
