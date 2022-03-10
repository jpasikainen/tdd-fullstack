const pgp = require('pg-promise')();
const db = pgp("postgres://webapp:secret@db:5432/webapp");

module.exports = db;