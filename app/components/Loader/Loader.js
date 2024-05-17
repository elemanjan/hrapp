import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {RED} from '@styles/colors';
import {scaleSize} from '@styles/mixins';

/**
 * Компонент лоадера для приложения
 * @example
 * {this.loading && <Loader />}
 */
class Loader extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: scaleSize(100),
        }}>
        <ActivityIndicator size="large" color={RED} {...this.props} />
      </View>
    );
  }
}

export default Loader;
