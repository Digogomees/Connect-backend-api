

exports.up = function(knex) {
  return knex.schema.createTable('project', function(table){

    table.increments('id');
    table.string('title').notNullable();
    table.string('description').notNullable();


  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('project')
};



