const { commonConfig } = require('./webpack.common');
const path = require('path');

module.exports = {
  ...commonConfig,
  entry: './src/electron/main.ts',
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.resolve(__dirname, '../dist/electron'),
    filename: 'index.js',
  },
};
