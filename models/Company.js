// Company model
'use strict';
var Bookshelf = require('../bookshelf');
var Company = Bookshelf.Model.extend({
tableName: 'company',
idAttribute: 'employer_user_id'

});
module.exports = Company;
