const HtmlWebpackPlugin = require('html-webpack-plugin');
const aliases = require('./aliases');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  common: {
    resolve: {
      mainFields: ['main', 'module', 'browser'],
      extensions: ['.tsx', '.ts', '.js'],
      alias: aliases.webpack,
    },
    mode: process.env.NODE_ENV,
    target: 'electron-main',
    devtool: !isProduction && 'source-map',
    module: {
      rules: [
        {
          test: /\.node$/,
          use: 'node-loader',
        },
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              onlyCompileBundledFiles: true,
            },
          },
        },
      ],
    },
  },
  extra: {
    external(...deps) {
      const external = {};

      for (const dep of deps) {
        external[dep] = `commonjs ${dep}`;
      }

      return external;
    },
    htmlPlugin: new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/common/index.html'),
      filename: 'index.html',
    }),
  },
};
