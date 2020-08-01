exports.up = function (knex) {
  return knex.schema.createTable('product', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.integer('markup').notNullable().defaultTo(0)

    table
      .integer('unitId', 11)
      .unsigned()
      .references('id')
      .inTable('unit')
      .onDelete('SET NULL')

    table
      .integer('categoryId', 11)
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('category')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('product')
}
