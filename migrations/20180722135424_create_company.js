// Company Table migration Data-Base Schema
exports.up = function(knex, Promise) {
    return knex.schema.createTable('company', (table) => {
        table.text('employer_user_id').primary();
        table.text('password').notNullable();
        table.text('employer_name').notNullable();
        table.text('employer_address').notNullable();
        table.text('company_categories').notNullable();
        table.json('logo');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('company');
};
