module.exports = {
  publish: [
    {
      provider: 'github',
      owner: 'codebyhumans',
      repo: 'warehouse',
    },
  ],
  asar: true,
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
  appId: 'com.codebyhumans.warehouse',
}
