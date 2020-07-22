const path = require('path');
const { common, extra } = require('./webpack');

module.exports = function (options = {}) {
  return {
    ...common,
    externals: extra.externalDeps('knex', 'electron', 'bcrypt'),
    entry: './src/client/index.tsx',
    target: 'electron-renderer',
    devServer: {
      contentBase: path.join(__dirname, '../dist/client'),
      historyApiFallback: true,
      compress: true,
      hot: true,
      port: 4000,
      publicPath: '/',
    },
    output: {
      path: path.resolve(__dirname, '../dist/client'),
      filename: 'index.js',
      publicPath: './',
    },
    plugins: [extra.htmlPlugin('../src/client/index.html')],
    ...options,
  };
};
