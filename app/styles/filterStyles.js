import {SCALE_10, SCALE_20} from './spacing';
import {WHITE} from './colors';
import {scaleSize} from './mixins';

const {StyleSheet} = require('react-native');

const filterStyles = StyleSheet.create({
  container: {
    padding: SCALE_20,
    backgroundColor: WHITE,
    height: '100%',
  },
  containerScreen: {
    paddingHorizontal: SCALE_20,
    paddingVertical: SCALE_10,
  },
  inputContainer: {
    marginBottom: scaleSize(15),
  },
  buttonContainer: {
    marginTop: SCALE_10,
  },
});

export default filterStyles;
