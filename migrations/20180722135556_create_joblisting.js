// Joblisting Table migration Data-Base Schema
exports.up = function(knex, Promise) {
    return knex.schema.createTable('joblisting', (table) => {
        table.increments('joblisting_id').unsigned().primary();
        table.text('company').references('company.employer_user_id');
        table.integer('years_exp').notNullable();
        table.text('job_title').notNullable();
        table.text('job_description').notNullable();
        table.json('applicants');
        table.json('keywords').notNullable();
    
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('joblisting');
};
