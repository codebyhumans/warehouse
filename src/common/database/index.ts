import Knex from 'knex';
import config from './config';

export const db = Knex(config);

export const checkDatabaseMigrations = async (setStatus: (msg: string) => void) => {
  setStatus('Проверка актуальность базы данных');
  const [, pendingMigrations] = await db.migrate.list();

  if (pendingMigrations.length) {
    setStatus('Обновление базы данных');
    await db.migrate.latest();
  }
};
