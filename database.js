require('dotenv').config()
const postgres = require('postgres')

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
  /* options */
}) // will use psql environment variables

module.exports = sql
