const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const aliases = require('./aliases')
const webpack = require('webpack')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

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
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
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
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  },
  extra: {
    externalDeps(...deps) {
      const external = {}

      for (const dep of deps) {
        external[dep] = `commonjs ${dep}`
      }

      return external
    },
    copyPlugin(patterns) {
      return new CopyWebpackPlugin({
        patterns,
      })
    },
    htmlPlugin(p) {
      return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, p),
        filename: 'index.html',
      })
    },
  },
}
