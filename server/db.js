const pgp = require('pg-promise')({ noLocking: true });
const db = pgp("postgres://webapp:secret@db:5432/webapp");

module.exports = db;