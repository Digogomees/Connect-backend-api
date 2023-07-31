

exports.up = function(knex) {
  return knex.schema.createTable('project', function(table){

    table.string('id').primary();
    table.string('title').notNullable();
    table.string('slug').notNullable();
    table.string('description').notNullable();
    table.json('about_project')
    table.string('tags')
    table.string('thumbnail').notNullable();
    table.string('views').defaultTo(0);

    table.timestamp('created_at').defaultTo(knex.fn.now());

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('project')
};



