// Documents model
'use strict';
var Bookshelf = require('../bookshelf');
var Documents = Bookshelf.Model.extend({
tableName: 'documents',
idAttribute: 'documents_id'
});
module.exports = Documents;