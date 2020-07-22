import Knex from 'knex';
import path from 'path';
import electron from 'electron';

const isProduction = process.env.NODE_ENV === 'production';
const databasePath = path.join((electron.app || electron.remote.app).getPath('userData'), 'database.sqlite');

export const db = Knex({
  client: 'sqlite3',
  connection: {
    filename: databasePath,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: isProduction ? `${process.resourcesPath}/migrations` : 'src/common/database/migrations',
    tableName: 'migrations',
  },
  useNullAsDefault: true,
});

export const checkDatabaseMigrations = async (setStatus: (msg: string) => void) => {
  setStatus('Проверка актуальности базы данных');

  const [, pendingMigrations] = await db.migrate.list();

  if (pendingMigrations.length) {
    setStatus('Обновление базы данных');
    await db.migrate.latest();
  }
};
