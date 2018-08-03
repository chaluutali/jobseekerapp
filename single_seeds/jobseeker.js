// TEST DATA! Drag file to seeds folder first then Run=> knex seed: run <=to populate the tables with test data 
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobseeker').del()
    .then(function () {
      const jobseeker = [{
        user_id : 'chaluutali@gmail.com',
        resume_id : 'Test Document',
        password : '0404',
        employee_name : 'Chaluutali Chirwa',
        employee_address : '38 test at testing road',
        category : {'word1' : 'Information Tecnology'},
        keywords : {'word1' : 'JAVA','word2' : 'JUNIOR'},
        years_exp : 3
      }]
      return knex('jobseeker').insert(jobseeker);
    });
};
