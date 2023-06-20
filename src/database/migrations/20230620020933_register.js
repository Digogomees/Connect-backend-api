/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('register', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.enum('category', ['Admin', 'collaborator']).notNullable();
    table.string('password').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('register')
};
