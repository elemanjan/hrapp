/**
 * This is style options for navigator screens
 */

import {RAISIN_BLACK} from '@styles/colors';
import {FONT_BOLD} from '@styles/typography';
import {SCALE_20} from '@styles/spacing';
import {CardStyleInterpolators} from '@react-navigation/stack';

export const HEADER_NONE = {header: () => null};
export const CARD_STYLE_INTERPOLATORS = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
export const HEADER_HEIGHT = 45;
export const HEADER_WITH_RIGHT_BUTTON = {
  headerRightContainerStyle: {
    // paddingRight: SCALE_20,
  },
};
export const HEADER_WITH_LEFT_BUTTON = {
  headerLeftContainerStyle: {
    paddingLeft: SCALE_20,
  },
};
export const DEFAULT_HEADER = {
  headerBackTitle: '',
  headerBackTitleVisible: false,
  headerTitleAlign: 'left',
  headerTintColor: RAISIN_BLACK,
  headerShadowVisible: false,
  headerTitleStyle: {
    color: RAISIN_BLACK,
    fontSize: 18,
    ...FONT_BOLD,
  },
  headerMode: 'screen',
  ...CARD_STYLE_INTERPOLATORS,
};
