import {Dimensions, Platform, StyleSheet} from 'react-native';
import {BLACK, GRAY_TEXT, LIGHT_BLUE, RED, WHITE} from './colors';
import {FONT_BOLD, FONT_SIZE_12, FONT_SIZE_16} from './typography';
import {SCALE_10, SCALE_16, SCALE_20} from './spacing';
import {scaleSize} from './mixins';
import {BORDER_RADIUS_6} from './borders';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BLUE,
  },
  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  dangerText: {
    color: RED,
  },
  itemDetailsText: {
    fontSize: FONT_SIZE_12,
    // lineHeight: FONT_SIZE_12 * 2,
    color: GRAY_TEXT,
  },
  itemDetailsTextRight: {
    color: BLACK,
  },
  buttonContainer: {
    paddingVertical: SCALE_20,
    paddingHorizontal: SCALE_16,
  },
  selectItem: {
    padding: SCALE_10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    borderRadius: BORDER_RADIUS_6,
  },
  addItem: {
    paddingHorizontal: SCALE_10,
    backgroundColor: '#fff',
    paddingTop: SCALE_10,
    paddingBottom: scaleSize(30),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    borderRadius: BORDER_RADIUS_6,
  },
  noText: {
    marginTop: SCALE_20,
    textAlign: 'center',
    fontSize: FONT_SIZE_12,
  },
  listBottomPadding: {
    paddingBottom: scaleSize(140),
  },
  titleText: {
    ...FONT_BOLD,
    fontSize: FONT_SIZE_16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
  },
  bottomContainer: {
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 15 : 5,
    alignItems: 'center',
  },
});
export default commonStyles;
