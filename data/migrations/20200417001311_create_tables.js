exports.up = function(knex) {
    return (
        knex.schema
            .createTable('ingredients', tbl => {
                tbl.increments('id');
                tbl.string('name', 100)
                    .notNullable();
            })
            .createTable('measurements', tbl => {
                tbl.increments('id');
                tbl.string('unit', 11)
                    .notNullable();
            })
            .createTable('recipes', tbl => {
                tbl.increments('id');
                tbl.string('title', 100)
                    .notNullable();
                tbl.string('author', 50)
                    .nullable();
            })
            .createTable('recipe_instructions', tbl => {
                tbl.increments('id');
                tbl.integer('step')
                    .notNullable();
                tbl.integer('recipe_id')
                    .unsigned()
                    .notNullable()
                    .references('recipes.id')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
                tbl.text('instructions')
                    .notNullable();
            })
            .createTable('recipe_ingredients', tbl => {
                tbl.increments('id');
                tbl.integer('recipe_id')
                    .unsigned()
                    .notNullable()
                    .references('recipes.id')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
                tbl.integer('ingredient_id')
                    .unsigned()
                    .notNullable()
                    .references('ingredients.id')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
                tbl.float('ammount')
                    .notNullable();
                tbl.integer('measurement_id')
                    .unsigned()
                    .nullable()
                    .references('measurements.id')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
            })
    );
};

exports.down = function(knex) {
    return (
        knex.schema
            .dropTableIfExists('ingredients')
            .dropTableIfExists('measurements')
            .dropTableIfExists('recipes')
            .dropTableIfExists('recipe_instructions')
            .dropTableIfExists('recipe_ingredients')
    );
};
