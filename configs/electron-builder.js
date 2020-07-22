const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
});

module.exports = {
  publish: [
    {
      provider: 'github',
      owner: 'codebyhumans',
      repo: 'anchor-crm',
      token: process.env.GH_TOKEN,
    },
  ],
  asar: false,
  directories: {
    output: 'build/',
  },
  files: ['dist/**/*'],
  extraResources: [
    'app-update.yml',
    {
      from: 'src/common/database/migrations',
      to: 'migrations',
    },
  ],
  appId: 'com.example.app',
};
