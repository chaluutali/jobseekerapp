// TEST DATA! Run=> knex seed: run <=to populate the tables with test data 
exports.seed = function(knex, Promise) {
  return knex('company').del()
  .then(() => {
    return knex('joblisting').del();
  })
  .then(() => {

    const company = [
      {
       employer_user_id: 'Reverside@reverside.com',
       password: '1234',
       employer_name: 'Reverside',
       employer_address: '154 Hurligham Manor',
       company_categories: 'JAVA',
       logo: {}},
     {
       employer_user_id: 'Verizon@verizon.com',
       password: '1111',
       employer_name: 'Verizon',
       employer_address: '154 Hurligham Manor',
       company_categories: 'SQL',
       logo: {}}]
    return knex('company').insert(company);
  })
  .then(() => {
    let joblistingPromises = [];
    const joblisting = [{
      company : 'Reverside@reverside.com',
      years_exp :2,
      job_title : 'Junior Fullstack Java Developer',
      job_description : 'a full stack front to back junior java developer',
      applicants : {},
      keywords : {'word1' : 'JAVA','word2' : 'JUNIOR'}
    }]

    joblisting.forEach((job) => {
      let merchant = job.company;
      joblistingPromises.push(createJob(knex, job, merchant));
    });
    return Promise.all(joblistingPromises);
  });
};
const createJob = (knex, job, merchant) => {
  return knex('company').where('employer_user_id', merchant).first()
  .then((companyJob) => {
    return knex('joblisting').insert({
      company : companyJob.id,
      years_exp :2,
      job_title : 'Junior Fullstack Java Developer',
      job_description : 'a full stack front to back junior java developer',
      applicants : {},
      keywords : {'word1' : 'JAVA','word2' : 'JUNIOR'}
     
    });
  });
};