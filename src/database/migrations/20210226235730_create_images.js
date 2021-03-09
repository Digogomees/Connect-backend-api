
exports.up = function(knex) {

    return knex.schema.createTable('images', function(table){
        table.increments('id');
        // table.string('img1').notNullable();
        // table.string('img2').notNullable();
        // table.string('img3').notNullable();
        // table.string('img4').notNullable();
        // table.string('img5').notNullable();
        // table.string('img6').notNullable();
        // table.string('img7').notNullable();
        // table.string('img8').notNullable();

        table.string('images_url').notNullable();
        

        table.string('project_id').notNullable();
        
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('images')
};