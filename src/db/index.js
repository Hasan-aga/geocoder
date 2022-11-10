const { Pool } = require("pg");
const pool = new Pool();

pool.query("SELECT NOW()", (err, res) => {
  console.log(res.rows);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
