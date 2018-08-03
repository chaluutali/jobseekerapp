var express = require('express'); //Imported express app
var Jobseeker = require('../models/Jobseeker'); // Imported the Jobseeker Model
var jwt = require('jsonwebtoken'); // Imported the JWT to generate Login token 
var bcrypt = require('bcryptjs'); // Imported the bcrypt js for passsword encryption
var config = require('../config');  
const router = express.Router();


//Get all Jobseekers 
router.get('/', (req, res, next) => {
  Jobseeker
  .fetchAll()
  .then((jobseeker)=>{
    res.json(jobseeker);
  })
});

//Get all Jobseekers with documents
router.get('/doc', (req, res, next) => {
  Jobseeker
  .fetchAll({withRelated: ['documents']})
  .then((jobseekers)=>{
    res.json({users: jobseekers});
  })
});
//Get Jobseeker with specified ID
router.get('/:id',(req, res, next) => {
  Jobseeker
  .where({user_id : req.params.id})
  .fetch()
  .then((jobseeker)=>{
    res.json(jobseeker)
  })
});
//Get Jobseeker with specified ID and documents
router.get('/doc/:id',(req, res, next) => {
  Jobseeker
  .where({user_id : req.params.id})
  .fetch({withRelated: ['documents']})
  .then((jobseeker)=>{
    res.json(jobseeker)
  })
});
//Create a New Jobseeker and insert it into the database with encrypted password. 
router.post('/', (req, res, next) => {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err,hash){
      Jobseeker.forge({
        user_id : req.body.user_id,
        resume_id : req.body.resume_id,
        password : hash,
        employee_name : req.body.employee_name,
        employee_address : req.body.employee_address,
        category : req.body.category,
        keywords : req.body.keywords,
        years_exp : req.body.years_exp
    })
    .save(null, {method: 'insert'})
    .then((saved) => {
    res.json({saved});
    });


    })
  })
   
});
//Jobseeker Login. 
router.post('/login', (req, res, next) => {

  Jobseeker
   .where({user_id: req.body.user_id})
   .fetch({withRelated: ['documents']})
   .then((jobseeker) => {
  
    //var valid = bcrypt.compare(req.body.password,jobseeker.password);
    var token = jwt.sign({id: jobseeker.user_id}, config.secret, {expiresIn: 86400});
    res.json({user: jobseeker, token: token});
    
   });
   
 
});
//Delete an Jobseeker with the Given ID
router.delete('/:id', (req, res, next) => {
  Jobseeker.forge({user_id : req.params.id})
  .fetch({require: true})
  .then((jobseeker) => {
    jobseeker.destroy()
    .then(()=>{
      res.json("Successfully deleted Jobseeker")
    })
  })
});
//Update the Jobseeker with the specified ID
router.patch('/:id', (req, res, next) => {
  Jobseeker
  .where({user_id : req.params.id})
  .fetch()
  .then((jobseeker)=>{
    jobseeker.save({
      user_id : req.body.user_id || jobseeker.user_id,
      resume_id : req.body.resume_id || jobseeker.resume_id,
      password : req.body.password || jobseeker.password,
      employee_name : req.body.employee_name || jobseeker.employee_name,
      employee_address : req.body.employee_address || jobseeker.employee_address,
      category : req.body.category || jobseeker.category,
      keywords : req.body.keywords || jobseeker.keywords,
      years_exp : req.body.years_exp || jobseeker.years_exp
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