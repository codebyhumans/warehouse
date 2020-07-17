const path = require('path');

const aliases = {
  '@electron': 'src/electron',
  '@client': 'src/client',
  '@common': 'src/common',
};

module.exports = {
  webpack: aliases,
};

for (const alias in aliases) {
  const aliasTo = aliases[alias];

  module.exports.webpack[alias] = path.resolve(__dirname, '../', aliasTo);
}
