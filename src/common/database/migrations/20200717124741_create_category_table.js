exports.up = function (knex) {
  return knex.schema.createTable('category', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.integer('parentId', 11)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('category')
}
