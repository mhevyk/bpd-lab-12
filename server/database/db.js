const pg = require("pg");

const client = new pg.Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "base_auth",
  port: 5432,
});

module.exports = client;
