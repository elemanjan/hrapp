import {StyleSheet} from 'react-native';
import {scaleSize} from '@styles/mixins';
import {BORDER_RADIUS_8} from '@styles/borders';
import {FONT_BOLD, FONT_SIZE_14} from '@styles/typography';
import {PRIMARY, WHITE} from '@styles/colors';

const styles = StyleSheet.create({
  container: {
    minHeight: scaleSize(50),
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS_8,
    paddingVertical: scaleSize(12),
    paddingHorizontal: scaleSize(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    ...FONT_BOLD,
    color: PRIMARY,
    fontSize: FONT_SIZE_14,
    textAlign: 'center',
    marginLeft: 5,
  },
  icon: {
    maxWidth: scaleSize(20),
    maxHeight: scaleSize(20),
    marginRight: scaleSize(5),
    resizeMode: 'contain',
  },
});
export default styles;
