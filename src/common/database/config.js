const path = require('path');
const fs = require('fs');
const electron = require('electron');

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.join((electron.app || electron.remote.app).getPath('userData'), 'database.sqlite'),
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './src/database/migrations',
    tableName: 'migrations',
  },
  useNullAsDefault: true,
};
