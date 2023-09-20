const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "db_bites_journey",
  user: "postgres", // the username you used when creating the todo table in postgres
  password: "postgres",
});
module.exports = pool;
