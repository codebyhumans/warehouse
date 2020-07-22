exports.up = function (knex) {
  return knex.schema.createTable('config', function (table) {
    table.string('name').unique().notNullable();
    table.string('type').notNullable();
    table.string('key').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('config');
};
