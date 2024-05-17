module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-flow'],
  env: {},
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ios.jsx', '.android.jsx', '.jsx', '.json'],
        cwd: 'babelrc',
        alias: {
          '@config': './app/config',
          '@store': './app/store',
          '@constants': './app/constants',
          '@components': './app/components',
          '@navigation': './app/navigation',
          '@screens': './app/screens',
          '@utils': './app/utils',
          '@assets': './app/assets',
          '@services': './app/services',
          '@hocs': './app/hocs',
          '@styles': './app/styles',
          '@validation': './app/validation',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
