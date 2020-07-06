const path = require('path');

const aliases = {
  '@components': 'src/renderer/components',
  '@services': 'src/renderer/services',
  '@layouts': 'src/renderer/layouts',
  '@stores': 'src/renderer/stores',
  '@pages': 'src/renderer/pages',
  '@theme': 'src/renderer/theme',
  '@libs': 'src/renderer/libs',
  '@common': 'src/common',
  '@src': 'src/renderer',
};

module.exports = {
  webpack: aliases,
  jest: {},
};

for (const alias in aliases) {
  const aliasTo = aliases[alias];

  module.exports.webpack[alias] = path.resolve(__dirname, aliasTo);
  module.exports.jest[`^${alias}/(.*)$`] = `<rootDir>/${aliasTo}/$1`;
}
