// Jobseeker model with relation to Document
'use strict';
var Bookshelf = require('../bookshelf');
var Documents = require('./Documents');
var Jobseeker = Bookshelf.Model.extend({
  tableName: 'jobseeker',
  idAttribute: 'user_id',
  documents: function() {
    return this.hasMany(Documents, 'documents_id');
  }
});
module.exports = Jobseeker;