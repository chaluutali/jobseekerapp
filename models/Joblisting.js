// Joblisting model with relation to Company model
'use strict';
var Bookshelf = require('../bookshelf');
var Company = require('./Company');
var Joblisting = Bookshelf.Model.extend({
  tableName: 'joblisting',
  idAttribute: 'joblisting_id',
  
  company: function() {
    return this.belongsTo(Company, 'employer_user_id');
  }
});
module.exports = Joblisting;