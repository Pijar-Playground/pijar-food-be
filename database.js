const postgres = require("postgres");

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "pijar",
  username: "postgres",
  password: "root"
  /* options */
}); // will use psql environment variables

module.exports = sql
