const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kanbandb",
});

db.connect((err) => {
  if (err) {
    console.log("unabled to connect to the database");
  } else {
    console.log("connected to database successfully");
  }
});

module.exports = db;
