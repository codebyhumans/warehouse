import Knex from 'knex';
import config from './config';

export const db = Knex(config);

export const databaseInitMigrations = async () => {
  const [, pendingMigrations] = await db.migrate.list();

  if (pendingMigrations.length) {
    return db.migrate.latest();
  }
};
