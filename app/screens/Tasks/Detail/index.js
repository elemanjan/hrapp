import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import commonStyles from '@styles/commonStyles';
import ProgressHUD from '@components/ProgressHUD';
import {GRAY_TEXT, ORANGE_DARK, PRIMARY, RED, SECONDARY, WHITE} from '@styles/colors';
import store from '@store/index';
import {MANAGER_STACK_NAVIGATION, USER_STACK_NAVIGATION} from '@navigation/screenConstants';
import {SCALE_16} from '@styles/spacing';
import {Colors} from '@styles/index';
import {FONT_BOLD, FONT_SIZE_12, FONT_SIZE_13} from '@styles/typography';
import STRINGS from '@constants/strings';
import TextField from '@components/TextField';
import {observer} from 'mobx-react';
import {getUserRole} from '@utils/getUserRole';
import CustomButton from '@components/CustomButton/CustomButton';
import {STATUSES} from '@constants/constants';
import FileViewer from 'react-native-file-viewer';
import CustomDatePicker from '@screens/components/CustomDatePicker';

const TaskDetailScreen = ({navigation}) => {
  const {
    isLoading,
    taskDescription,
    taskTitle,
    setValue,
    uploadFile,
    taskFile,
    userTaskFile,
    updateTask,
    firstName,
    deleteTask,
    taskStatus,
    deadlineDate,
    updateTaskStatus,
    userTaskDescription,
    openFile,
    setDeadlineDate,
  } = store.appStore;
  const isUser = getUserRole() === 'user';

  const handleDelete = async () => {
    await deleteTask();
    navigation.navigate(MANAGER_STACK_NAVIGATION.LIST);
  };
  const handleUpdate = async () => {
    await updateTask();
    navigation.navigate(MANAGER_STACK_NAVIGATION.LIST);
  };

  async function handleUploadFile() {
    await uploadFile();
  }

  function handleUpdateStatus(status) {
    updateTaskStatus(status);
    if (isUser) {
      navigation.navigate(USER_STACK_NAVIGATION.LIST);
    } else {
      navigation.navigate(MANAGER_STACK_NAVIGATION.LIST);
    }
  }

  return (
    <SafeAreaView edges={['left', 'right']} style={[commonStyles.container]}>
      <View style={styles.container}>
        <KeyboardAwareScrollView extraScrollHeight={140} style={styles.inputWrapContainer}>
          <TextField value={firstName} label={STRINGS.placeholders.username} editable={false} />
          <TextField
            value={taskTitle}
            onChangeText={text => setValue('taskTitle', text)}
            label={STRINGS.placeholders.taskName}
            containerStyles={styles.inputContainer}
            editable={!isUser && taskStatus === STATUSES.new}
          />
          <TextField
            multiline
            value={taskDescription}
            onChangeText={text => setValue('taskDescription', text)}
            label={STRINGS.placeholders.comment}
            inputStyles={styles.noteInput}
            containerStyles={styles.inputContainer}
            editable={!isUser && taskStatus === STATUSES.new}
          />
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Дата выполнения</Text>
            <CustomDatePicker
              dt={deadlineDate}
              isEditable={!isUser && taskStatus === STATUSES.new}
              onChangeDate={setDeadlineDate}
              placeholder={'Выберите дату дедлайна'}
            />
          </View>
          {taskFile?.name ? (
            <Text style={[styles.attachTitle, {marginTop: 8}]} onPress={() => openFile(false)}>
              {STRINGS.text.attachment}: {taskFile.name}
            </Text>
          ) : null}
          {!isUser && taskStatus !== STATUSES.new ? (
            <TextField
              multiline
              value={userTaskDescription}
              onChangeText={text => setValue('userTaskDescription', text)}
              label={STRINGS.placeholders.userComment}
              inputStyles={styles.noteInput}
              containerStyles={styles.inputContainer}
              editable={taskStatus !== STATUSES.done && isUser}
            />
          ) : null}
          {isUser ? (
            <TextField
              multiline
              value={userTaskDescription}
              onChangeText={text => setValue('userTaskDescription', text)}
              label={STRINGS.placeholders.userComment}
              inputStyles={styles.noteInput}
              containerStyles={styles.inputContainer}
              editable={taskStatus !== STATUSES.done && isUser}
            />
          ) : null}
          {userTaskFile?.name && isUser ? (
            <Text style={[styles.attachTitle, {marginTop: 16}]} onPress={() => openFile(true)}>
              {STRINGS.text.userAttachment}: {userTaskFile.name}
            </Text>
          ) : null}
          {taskStatus === STATUSES.new ? (
            <TouchableOpacity onPress={handleUploadFile} style={styles.attachButton}>
              <Text style={styles.attachTitle}>{STRINGS.buttons.addAttach}</Text>
            </TouchableOpacity>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: isUser ? 'center' : 'space-between',
              marginTop: 30,
              marginBottom: 20,
            }}>
            {!isUser && (
              <>
                <CustomButton
                  disabled={taskStatus !== STATUSES.done}
                  title={STRINGS.buttons.accept}
                  onPress={() => handleUpdateStatus(STATUSES.accepted)}
                  containerStyles={{backgroundColor: SECONDARY, marginHorizontal: 10}}
                  textStyles={{color: WHITE}}
                />
                <CustomButton
                  disabled={taskStatus !== STATUSES.done}
                  title={STRINGS.buttons.reject}
                  onPress={() => handleUpdateStatus(STATUSES.rejected)}
                  containerStyles={{backgroundColor: ORANGE_DARK}}
                  textStyles={{color: WHITE}}
                />
              </>
            )}
            <CustomButton
              disabled={isUser && taskStatus === STATUSES.done}
              title={isUser ? STRINGS.buttons.done : STRINGS.buttons.delete}
              onPress={isUser ? () => handleUpdateStatus(STATUSES.done) : handleDelete}
              containerStyles={[
                {backgroundColor: isUser ? SECONDARY : RED, marginHorizontal: 10},
                isUser ? {width: '95%'} : {},
              ]}
              textStyles={{color: WHITE}}
            />
          </View>
          <View style={{paddingBottom: 40}}>
            <CustomButton
              hide={isUser || taskStatus === STATUSES.accepted || taskStatus === STATUSES.rejected}
              title={STRINGS.buttons.save}
              onPress={handleUpdate}
              containerStyles={{marginHorizontal: 10, marginTop: 4, marginBottom: 120}}
            />
          </View>
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
  },
  inputWrapContainer: {
    paddingBottom: 4,
    paddingTop: 20,
    marginHorizontal: SCALE_16,
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

export default observer(TaskDetailScreen);
