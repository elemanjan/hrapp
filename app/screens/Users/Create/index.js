import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import commonStyles from '@styles/commonStyles';
import CustomButton from '@components/CustomButton';
import ProgressHUD from '@components/ProgressHUD';
import {WHITE} from '@styles/colors';
import store from '@store/index';
import {SCALE_16} from '@styles/spacing';
import {Colors} from '@styles/index';
import {FONT_BOLD} from '@styles/typography';
import STRINGS from '@constants/strings';
import TextField from '@components/TextField';
import {observer} from 'mobx-react';

const UserCreateScreen = ({navigation}) => {
  const {isLoading, setValue, firstName, login, password, email, createUser} = store.appStore;

  const handleCreateUser = async () => {
    const res = createUser();
    if (res) {
      navigation.goBack();
    }
  };

  function checkDisabledBtn() {
    return !firstName || !login || !password || !email;
  }

  return (
    <SafeAreaView edges={['left', 'right']} style={[commonStyles.container]}>
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.inputWrapContainer}>
          <TextField
            value={firstName}
            onChangeText={text => setValue('firstName', text)}
            label={STRINGS.placeholders.firstName}
          />
          <TextField
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            spellCheck={false}
            value={email}
            onChangeText={text => setValue('email', text)}
            label={STRINGS.placeholders.email}
            containerStyles={styles.inputContainer}
          />
          <TextField
            value={login}
            onChangeText={text => setValue('login', text)}
            autoCapitalize={'none'}
            spellCheck={false}
            label={STRINGS.placeholders.login}
            containerStyles={styles.inputContainer}
          />
          <TextField
            value={password}
            onChangeText={text => setValue('password', text)}
            autoCapitalize={'none'}
            spellCheck={false}
            secureTextEntry
            label={STRINGS.placeholders.password}
            containerStyles={styles.inputContainer}
          />
          <CustomButton
            disabled={checkDisabledBtn()}
            title={STRINGS.buttons.createUser}
            onPress={handleCreateUser}
            containerStyles={{marginHorizontal: 10, marginTop: 30, marginBottom: 20}}
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
});

export default observer(UserCreateScreen);
