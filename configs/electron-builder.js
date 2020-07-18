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
  appId: 'com.example.app',
};
