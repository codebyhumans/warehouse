exports.up = function (knex) {
  return knex.schema.createTable('provider', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('address');
    table.string('taxId');
    table.string('phone');
    table.string('email');
    table.string('bankName');
    table.string('bankAddress');
    table.string('bankMfo');
    table.string('bankExpense');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('provider');
};
