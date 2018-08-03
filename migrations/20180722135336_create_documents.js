// Documents Table migration Data-Base Schema
exports.up = function(knex, Promise) {
    return knex.schema.createTable('documents', (table) => {
        table.text('documents_id').primary();
        table.text('format_type').notNullable();
        table.double('file_size').notNullable();
        table.text('file_name').notNullable();
        table.text('data_type').notNullable();
        table.json('document').notNullable();
      })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('documents');
};
