// Jobseeker Table migration Data-Base Schema
exports.up = function(knex, Promise) {
    return knex.schema.createTable('jobseeker', (table) => {
        table.text('user_id').primary();
        table.text('resume_id').references('documents.documents_id');
        table.text('password').notNullable();
        table.text('employee_name').notNullable();
        table.text('employee_address').notNullable();
        table.json('category').notNullable();
        table.json('keywords').notNullable();
        table.integer('years_exp').notNullable();
      })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('jobseeker');
};
