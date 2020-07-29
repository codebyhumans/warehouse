exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('password').notNullable()

    table.timestamp('deletedAt')
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())

    table
      .integer('roleId', 11)
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('role')
      .onDelete('SET NULL')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('user')
}
