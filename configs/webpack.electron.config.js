const path = require('path');
const aliases = require('./aliases.config');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: aliases.webpack,
  },
  devtool: 'source-map',
  entry: './src/electron/main.ts',
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
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
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
};
