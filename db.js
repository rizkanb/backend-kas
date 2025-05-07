const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_kas",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Koneksi database berhasil");
});

module.exports = db;
