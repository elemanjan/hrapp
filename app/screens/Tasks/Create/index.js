import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import commonStyles from '@styles/commonStyles';
import CustomButton from '@components/CustomButton';
import ProgressHUD from '@components/ProgressHUD';
import {GRAY_TEXT, PRIMARY, WHITE} from '@styles/colors';
import store from '@store/index';
import {SCALE_16} from '@styles/spacing';
import {Colors} from '@styles/index';
import {FONT_BOLD, FONT_SIZE_12, FONT_SIZE_13} from '@styles/typography';
import STRINGS from '@constants/strings';
import TextField from '@components/TextField';
import {observer} from 'mobx-react';
import {MANAGER_STACK_NAVIGATION} from '@navigation/screenConstants';
import CustomDatePicker from '@screens/components/CustomDatePicker';

const TaskCreateScreen = ({navigation}) => {
  const {isLoading, taskDescription, taskTitle, setValue, uploadFile, taskFile, createTask, openFile, setDeadlineDate} =
    store.appStore;

  const handleCreate = async () => {
    await createTask();
    navigation.navigate(MANAGER_STACK_NAVIGATION.LIST);
  };

  async function handleUploadFile() {
    await uploadFile();
  }

  function checkDisabledBtn() {
    return !taskDescription || !taskTitle;
  }

  return (
    <SafeAreaView edges={['left', 'right']} style={[commonStyles.container]}>
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.inputWrapContainer}>
          <TextField
            value={taskTitle}
            onChangeText={text => setValue('taskTitle', text)}
            label={STRINGS.placeholders.taskName}
          />
          <TextField
            multiline
            value={taskDescription}
            onChangeText={text => setValue('taskDescription', text)}
            label={STRINGS.placeholders.comment}
            inputStyles={styles.noteInput}
            containerStyles={styles.inputContainer}
          />
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Дата выполнения</Text>
            <CustomDatePicker onChangeDate={setDeadlineDate} placeholder={'Выберите дату дедлайна'} />
          </View>
          {taskFile.name ? (
            <Text style={{marginTop: 8, color: PRIMARY}} onPress={openFile}>
              {STRINGS.text.attachment}: {taskFile.name}
            </Text>
          ) : null}
          <TouchableOpacity onPress={handleUploadFile} style={styles.attachButton}>
            <Text style={styles.attachTitle}>{STRINGS.buttons.addAttach}</Text>
          </TouchableOpacity>
          <CustomButton
            disabled={checkDisabledBtn()}
            title={STRINGS.buttons.createTask}
            onPress={handleCreate}
            containerStyles={{marginHorizontal: 10, marginTop: 30, marginBottom: 40}}
          />
        </KeyboardAwareScrollView>
      </View>
      <ProgressHUD isLoading={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: SCALE_16,
  },
  inputWrapContainer: {
    paddingBottom: 5,
    paddingTop: 20,
  },
  inputContainer: {
    paddingTop: SCALE_16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  textContainer: {
    height: '40%',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: Colors.BLACK_TEXT,
    ...FONT_BOLD,
  },
  noteInput: {
    textAlignVertical: 'top',
    height: 150,
    paddingHorizontal: 10,
    fontSize: FONT_SIZE_13,
  },
  attachButton: {
    paddingTop: 20,
  },
  attachTitle: {
    color: PRIMARY,
  },
  dateContainer: {
    paddingTop: 20,
  },
  dateLabel: {
    color: GRAY_TEXT,
    fontSize: FONT_SIZE_12,
    marginBottom: 2,
  },
});

export default observer(TaskCreateScreen);
