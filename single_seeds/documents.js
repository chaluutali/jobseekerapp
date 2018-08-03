// TEST DATA! Drag file to seeds folder first then Run=> knex seed: run <=to populate the tables with test data 
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('documents').del()
    .then(function () {
      const documents = [{
        documents_id : 'Test Document',
        format_type : 'Test-Type',
        file_size : 128.0,
        file_name : 'Test',
        data_type : '.doc',
        document : {'string': 'its just data'}
      }]
      return knex('documents').insert(documents);
    });
};
