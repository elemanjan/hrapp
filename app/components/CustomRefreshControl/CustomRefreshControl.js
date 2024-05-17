import React from 'react';
import {RefreshControl} from 'react-native';
import {ORANGE_DARK, WHITE} from '@styles/colors';
import PropTypes from 'prop-types';

/**
 * RefreshControl с специальным цветом в приложении
 * {@link https://reactnative.dev/docs/refreshcontrol}
 * @example
 * <ScrollView refreshControl={<CustomRefreshControl onRefresh={this.onRefresh} refreshing={true}/>}></ScrollView>
 */

function CustomRefreshControl(props) {
  return <RefreshControl progressBackgroundColor={ORANGE_DARK} tintColor={ORANGE_DARK} colors={[WHITE]} {...props} />;
}

CustomRefreshControl.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
};

export default CustomRefreshControl;
