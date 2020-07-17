import Knex from 'knex';

export const db = Knex({
  client: 'sqlite3',
  connection: {
    filename: './src/database/database.sqlite',
  },
  useNullAsDefault: true,
});
