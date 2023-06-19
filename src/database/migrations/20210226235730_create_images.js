
exports.up = function(knex) {

    return knex.schema.createTable('images', function(table){
        table.increments('id');
        table.string('images_url').notNullable();
        table.integer('project_id').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('images')
};