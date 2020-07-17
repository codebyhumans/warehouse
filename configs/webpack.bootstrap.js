const path = require('path');
const { commonConfig, extraConfig } = require('./webpack.common');

module.exports = {
  ...commonConfig,
  externals: [extraConfig.nodeExternals],
  entry: './src/bootstrap/index.tsx',
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, '../dist/bootstrap'),
    filename: 'index.js',
  },
  plugins: [extraConfig.htmlPlugin],
};
