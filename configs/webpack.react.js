const { commonConfig, extraConfig } = require('./webpack.common');
const path = require('path');

module.exports = {
  ...commonConfig,
  externals: [extraConfig.nodeExternals],
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
    filename: 'js/client.js',
    publicPath: './',
  },
  plugins: [extraConfig.htmlPlugin],
};
