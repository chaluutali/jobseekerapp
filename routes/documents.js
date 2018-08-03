var express = require('express'); //Import express app
var Documents = require('../models/Documents'); // Import the Documents Model
const router = express.Router();
//Get all Documents
router.get('/', (req, res, next) => {
  Documents
  .fetchAll()
  .then((documentslist)=>{
    res.json(documentslist);
  })
});
//Get Document with specified ID
router.get('/:id',(req, res, next) => {
  Documents
  .where({documents_id : req.params.id})
  .fetch()
  .then((document)=>{
    res.json(document)
  })
});
//Create a New Document and insert it into the database. 
router.post('/', (req, res, next) => {
  
   Documents.forge({
    documents_id : req.body.documents_id,
    format_type : req.body.format_type,
    file_size : req.body.file_size,
    file_name : req.body.file_name,
    data_type : req.body.data_type,
    document : req.body.document
    })
    .save(null, {method: 'insert'})
    .then((saved) => {
    res.json({saved});
    });
});
//Delete a Document with the Given ID
router.delete('/:id', (req, res, next) => {
  Documents.forge({documents_id : req.params.id})
  .fetch({require: true})
  .then((document) => {
    document.destroy()
    .then(()=>{
      res.json("Successfully deleted Document")
    })
  })
});
//Update the Document with the specified ID
router.patch('/:id', (req, res, next) => {
  Documents
  .where({documents_id : req.params.id})
  .fetch()
  .then((document)=>{
    document.save({
      documents_id : req.body.documents_id || document.documents_id,
      format_type : req.body.format_type || document.format_type,
      file_size : req.body.file_size || document.file_size,
      file_name : req.body.file_name || document.file_name,
      data_type : req.body.data_type || document.data_type,
      document : req.body.document || document.document
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