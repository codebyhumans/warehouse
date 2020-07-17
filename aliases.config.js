const path = require('path');

const aliases = {
  '@electron': 'src/electron',
  '@client': 'src/client',
  '@common': 'src/common',
  '@db': 'src/database',
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
