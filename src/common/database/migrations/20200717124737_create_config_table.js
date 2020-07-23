exports.up = function (knex) {
  return knex.schema.createTable('config', function (table) {
    table.string('key').unique().notNullable();
    table.string('type');
    table.string('value').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('config');
};
