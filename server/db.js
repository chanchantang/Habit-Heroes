const Pool = require("pg").Pool;

var parse = require("pg-connection-string").parse;

var config = parse(process.env.DATABASE_URL);

const pool = new Pool(config);

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "postgres",
//   port: 5433,
// });

module.exports = pool;
