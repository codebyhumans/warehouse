exports.up = function (knex) {
  return knex.schema.createTable('unit', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('measure').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('unit')
}
