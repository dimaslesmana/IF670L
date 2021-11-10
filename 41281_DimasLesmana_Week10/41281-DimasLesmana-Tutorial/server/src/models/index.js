const dbConfig = require('../config/db.config');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: dbConfig.db.host,
    user: dbConfig.db.user,
    password: dbConfig.db.password,
    database: dbConfig.db.database,
  }
});

const db = {};
db.client = knex;
db.table = dbConfig.table;
db.student = require('./student.model');

module.exports = db;
