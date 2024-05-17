import {StyleSheet} from 'react-native';
import {SCALE_10, SCALE_16} from '@styles/spacing';
import {BORDER_COLOR_GRAY, BORDER_RADIUS_6} from '@styles/borders';
import {FONT_SIZE_12} from '@styles/typography';
import {BLACK, GRAY_TEXT, RED} from '@styles/colors';
import {scaleSize} from '@styles/mixins';

const styles = StyleSheet.create({
  inputContainer: {
    // marginBottom: SCALE_25,
    // paddingHorizontal: SCALE_16,
  },
  inputField: {
    position: 'relative',
    backgroundColor: '#fff',
    borderColor: BORDER_COLOR_GRAY,
    borderWidth: 0.5,
    borderRadius: BORDER_RADIUS_6,
    justifyContent: 'center',
  },
  input: {
    height: scaleSize(50),
    paddingHorizontal: SCALE_16,
    color: BLACK,
    fontSize: FONT_SIZE_12,
  },
  label: {
    marginBottom: 2,
  },
  labelText: {
    color: GRAY_TEXT,
    fontSize: FONT_SIZE_12,
  },
  errorContainer: {
    marginVertical: scaleSize(3),
    height: scaleSize(14),
  },
  errorText: {
    color: RED,
    fontSize: FONT_SIZE_12,
    lineHeight: scaleSize(14),
  },
  errorBorder: {
    borderColor: RED,
    borderWidth: 0.5,
  },
  iconContainer: {
    position: 'absolute',
    // alignItems: 'center',
    height: '100%',
    right: 0,
    zIndex: 10,
  },
  iconButton: {
    paddingHorizontal: SCALE_10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});

export default styles;
