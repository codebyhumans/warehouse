const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const aliases = require('./aliases.config');
const path = require('path');

module.exports = {
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser'],
    alias: aliases.webpack,
  },
  entry: './src/client/index.tsx',
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
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
    filename: 'js/[name].js',
    publicPath: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/client/index.html'),
      filename: './index.html',
    }),
  ],
};
