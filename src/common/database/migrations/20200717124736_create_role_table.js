exports.up = async function (knex) {
  await knex.schema.createTable('role', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.integer('permissions').notNullable()
    table.boolean('system').defaultTo(false).notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex('role').insert([
    {
      id: 1,
      name: 'Администратор',
      permissions: 1,
      system: true,
    },
  ])
}

exports.down = function (knex) {
  return knex.schema.dropTable('role')
}
