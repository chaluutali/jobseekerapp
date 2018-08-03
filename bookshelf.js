// linking knex to bookshelf
'use strict'
 
// using the config file for the environment
var knex = require('knex')(require('./knexfile')[process.env.NODE_ENV])
 
// using the knex setup we created above
var bookshelf = require('bookshelf')(knex);

// Resolve circulr dependencies with relations
bookshelf.plugin('registry');
 
// make sure bookshelf is available when importing this file
module.exports = bookshelf;