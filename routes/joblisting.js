var express = require('express'); //Import express app
var Joblisting = require('../models/Joblisting'); // Import the Joblisting Model
const router = express.Router();
//Get all Joblistings
router.get('/', (req, res, next) => {
  Joblisting
  .fetchAll()
  .then((jobs)=>{
    res.json(jobs);
  })
});
// Get all Current company Joblistings
router.get('/company/:id', (req, res, next) => {
  Joblisting
  .where({company : req.params.id})
  .fetchAll({withRelated: ['company']})
  .then((jobs)=>{
    res.json(jobs);
  })
});
// Get all searched for  Joblistings
router.post('/search', (req, res, next) => {
  Joblisting
  .fetchAll({withRelated: ['company']})
  .then((jobs)=>{
     var searchword = JSON.parse(req.body.keywords).find(obj => {
      return obj === 'word'
     })
    var result = jobs.find(obj => {
      return obj.keywords === searchword
    })

    res.json(result);
  })
});
//Get all Joblistings associated with a company
router.get('/company', (req, res, next) => {
  Joblisting
  .fetchAll({withRelated: ['company']})
  .then((jobs)=>{
    res.json(jobs);
  })
});
//Get Joblisting with specified ID
router.get('/:id',(req, res, next) => {
  Joblisting
  .where({joblisting_id : req.params.id})
  .fetch()
  .then((job)=>{
    res.json(job)
  })
});
//Get Joblisting with specified ID associated with a company
router.get('/company/:id',(req, res, next) => {
  Joblisting
  .where({joblisting_id : req.params.id})
  .fetch({withRelated: ['company']})
  .then((job)=>{
    res.json(job)
  })
});
//Create a New Joblisting and insert it into the database. 
router.post('/', (req, res, next) => {
  
   Joblisting.forge({
      company : req.body.company,
      years_exp : req.body.years_exp,
      job_title : req.body.job_title,
      job_description : req.body.job_description,
      applicants : req.body.applicants,
      keywords : req.body.keywords
    })
    .save(null, {method: 'insert'})
    .then((saved) => {
    res.json({saved});
    });
});
//Delete an Joblisting with the Given ID
router.delete('/:id', (req, res, next) => {
  Joblisting.forge({joblisting_id : req.params.id})
  .fetch({require: true})
  .then((job) => {
    job.destroy()
    .then(()=>{
      res.json("Successfully deleted Joblisting")
    })
  })
});
//Update the Joblisting with the specified ID
router.patch('/:id', (req, res, next) => {
  Joblisting
  .where({joblisting_id : req.params.id})
  .fetch()
  .then((job)=>{
    job.save({
      company : req.body.company || job.company,
      years_exp : req.body.years_exp || job.years_exp,
      job_title : req.body.job_title || job.job_title,
      job_description : req.body.job_description || job.job_description,
      applicants : req.body.applicants || job.applicants,
      keywords : req.body.keywords || job.keywords
    }, {
      method: 'update',
      patch: true
    })
    .then((update)=>{
      res.json(update);
    })
  })
});
 module.exports = router;