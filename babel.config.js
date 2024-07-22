module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-transform-export-namespace-from'],
    [
      'module-resolver',
      {
        alias: {
          '#': './src',
          lib: './src/lib',
          state: './src/state',
          platform: './src/platform',
          view: './src/view',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        allowUndefined: true,
        path: '.env',
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
}
