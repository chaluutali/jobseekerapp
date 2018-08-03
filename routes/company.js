var express = require('express'); //Import express app
var Company = require('../models/Company'); // Import the Company Model
var jwt = require('jsonwebtoken'); // Imported the JWT to generate Login token 
var bcrypt = require('bcryptjs'); // Imported the bcrypt js for passsword encryption
var config = require('../config');  
const router = express.Router();
//Get all Companies
router.get('/', (req, res, next) => {
  Company
  .fetchAll()
  .then((companies)=>{
    res.json(companies);
  })
});
//Get Company with specified ID
router.get('/:id',(req, res, next) => {
  Company
  .where({employer_user_id : req.params.id})
  .fetch()
  .then((Company)=>{
    res.json(Company)
  })
});
//Create a New Company and insert it into the database. 
router.post('/', (req, res, next) => {
  
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt){
  bcrypt.hash(req.body.password, salt, function(err,hash){
    Company.forge({
      employer_user_id : req.body.employer_user_id,
      password : hash,
      employer_name : req.body.employer_name,
      employer_address : req.body.employer_address,
      company_categories : req.body.company_categories,
      logo : req.body.logo
      })
  .save(null, {method: 'insert'})
  .then((saved) => {
  res.json({saved});
  });


  })
})
   
});
// login company user
router.post('/login', (req, res, next) => {
  
  Company
   .where({employer_user_id: req.body.employer_user_id})
   .fetch()
   .then((company) => {
  
    //var valid = bcrypt.compare(req.body.password,jobseeker.password);
    var token = jwt.sign({id: company.employer_user_id}, config.secret, {expiresIn: 86400});
    res.json({company: company, token: token});
    
   });
   
 
});
//Delete an Company with the Given ID
router.delete('/:id', (req, res, next) => {
  Company.forge({employer_user_id : req.params.id})
  .fetch({require: true})
  .then((company) => {
    company.destroy()
    .then(()=>{
      res.json("Successfully deleted Company")
    })
  })
});
//Update the Company with the specified ID
router.patch('/:id', (req, res, next) => {
  Company
  .where({employer_user_id : req.params.id})
  .fetch()
  .then((company)=>{
    company.save({
      employer_user_id : req.body.employer_user_id || company.employer_user_id,
      password : req.body.password || company.password,
      employer_name : req.body.employer_name || company.employer_name,
      employer_address : req.body.employer_address || company.employer_address,
      company_categories : req.body.company_categories || company.company_categories,
      logo : req.body.logo || company.logo
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