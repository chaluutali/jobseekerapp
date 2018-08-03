/*knex.js query builder is connected to the postgres database by setting up the database configuration
establishing a connection between the database and application.  
for development purposes all other environments configurations have been omitted e.g production, staging e.t.c
*/
require('dotenv').config({path: './.env'});
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_Host,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
  }
};
