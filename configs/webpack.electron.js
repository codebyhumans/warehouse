const { common } = require('./webpack');
const path = require('path');

module.exports = function (options = {}) {
  return {
    ...common,
    entry: './src/electron/main.ts',
    node: {
      __dirname: false,
      __filename: false,
    },
    output: {
      path: path.resolve(__dirname, '../dist/electron'),
      filename: 'index.js',
    },
    ...options,
  };
};
