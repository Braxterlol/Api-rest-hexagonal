import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Bryam203A",
  database: "hexagonal",
  connectionLimit: 10,
});
