import Knex from 'knex';

export const db = Knex({
  client: 'sqlite3',
  connection: {
    filename: 'database.sqlite',
  },
  useNullAsDefault: true,
});
