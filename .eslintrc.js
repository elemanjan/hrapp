module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:mobx/recommended'],
  plugins: ['prettier', 'mobx'],
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': 'error',
    'mobx/exhaustive-make-observable': 0,
    'mobx/unconditional-make-observable': 0,
    'mobx/missing-make-observable': 0,
    'mobx/missing-observer': 0,
    'mobx/no-anonymous-observer': 0,
  },
};
