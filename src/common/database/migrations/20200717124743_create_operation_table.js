exports.up = function (knex) {
  return knex.schema.createTable('operation', function (table) {
    table.increments('id').primary()
    table.string('number')
    table.integer('price').notNullable()
    table.integer('type').notNullable()
    table.integer('qty').notNullable()
    table.boolean('consider').notNullable().defaultTo(true)
    table.timestamp('createdAt').defaultTo(knex.fn.now())

    table
      .integer('productId', 11)
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('product')
      .onDelete('CASCADE')

    table
      .integer('userId', 11)
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('user')

    table
      .integer('providerId', 11)
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('provider')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('operation')
}
