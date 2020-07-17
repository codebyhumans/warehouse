const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const aliases = require('./aliases');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  commonConfig: {
    resolve: {
      mainFields: ['main', 'module', 'browser'],
      extensions: ['.tsx', '.ts', '.js'],
      alias: aliases.webpack,
    },
    devtool: !isProduction && 'source-map',
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
  },
  extraConfig: {
    nodeExternals: nodeExternals(),
    htmlPlugin: new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/common/index.html'),
      filename: './index.html',
    }),
  },
};
