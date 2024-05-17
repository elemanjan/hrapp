import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import commonStyles from '@styles/commonStyles';
import CustomButton from '@components/CustomButton';
import ProgressHUD from '@components/ProgressHUD';
import {PRIMARY, WHITE} from '@styles/colors';
import store from '@store/index';
import {NAVIGATION_APP} from '@navigation/screenConstants';
import {SCALE_16} from '@styles/spacing';
import {FONT_BOLD} from '@styles/typography';
import STRINGS from '@constants/strings';
import TextField from '@components/TextField';
import CreateEmptyAlert from '@utils/createEmptyAlert';
import {observer} from 'mobx-react';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading, onLogin} = store.appStore;
  /**
   * Запрос на бакэнд для логина
   */
  const handleLogin = async () => {
    const isSuccess = await onLogin(username, password);
    if (isSuccess) {
      navigation.replace(NAVIGATION_APP);
    } else {
      CreateEmptyAlert(STRINGS.alertError.badCredentials);
    }
  };

  return (
    <SafeAreaView edges={['left', 'right']} style={[commonStyles.container]}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Авторизация</Text>
        </View>
        <KeyboardAwareScrollView style={styles.inputWrapContainer}>
          <TextField
            value={username}
            onChangeText={text => setUsername(text)}
            autoCapitalize={'none'}
            spellCheck={false}
            label={STRINGS.placeholders.login}
          />
          <TextField
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize={'none'}
            spellCheck={false}
            secureTextEntry
            label={STRINGS.placeholders.password}
            containerStyles={styles.inputContainer}
          />
          <CustomButton
            title={'Войти'}
            onPress={handleLogin}
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
    height: '60%',
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
    color: PRIMARY,
    ...FONT_BOLD,
  },
});

export default observer(LoginScreen);
