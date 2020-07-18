const path = require('path');
const { common, extra } = require('./webpack');

module.exports = function (options = {}) {
  return {
    ...common,
    externals: extra.external('electron'),
    entry: './src/bootstrap/index.tsx',
    target: 'electron-renderer',
    devServer: {
      contentBase: path.join(__dirname, '../dist/bootstrap'),
      historyApiFallback: true,
      compress: true,
      hot: true,
      port: 4001,
      publicPath: '/',
    },
    output: {
      path: path.resolve(__dirname, '../dist/bootstrap'),
      filename: 'index.js',
    },
    plugins: [extra.htmlPlugin],
    ...options,
  };
};
