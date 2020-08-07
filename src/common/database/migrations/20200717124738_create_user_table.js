exports.up = async function (knex) {
  await knex.schema.createTable('user', function (table) {
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

  await knex('User').insert([
    {
      name: 'Администратор',
      password: '$2b$12$XoycntF2WhvtcBMb0WfwwO9W4QNH7MrVNnLILZxDECTWEkzbcArWi',
      roleId: 1,
    },
  ])
}

exports.down = function (knex) {
  return knex.schema.dropTable('user')
}
