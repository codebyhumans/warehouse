module.exports = {
  publish: [
    {
      provider: 'github',
      owner: 'codebyhumans',
      repo: 'anchor-crm',
    },
  ],
  directories: {
    output: 'build/',
  },
  files: ['dist/**/*'],
  extraResources: ['app-update.yml'],
  appId: 'com.example.app',
};
