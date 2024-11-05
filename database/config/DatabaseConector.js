import dotenv from "dotenv";
import sqlite3 from "sqlite3";

dotenv.config();

// Set the path to your SQLite3 database file
const databasePath = "/Users/jordiguix/Documents/UNIVERSIDAD/MADRID/MATRICULADO - URJC/24-25 2o Año/1er Semestre/Proceso Software/PRACTICAS/PRACTICA 1 - GITHUB/Practica-Procesos-de-Software-URJC/database/database.db";

// Create a new SQLite3 database connection
const db = new sqlite3.Database(databasePath);

// Function to execute a query and return the result
async function executeQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Function to execute non-query SQL statements
function executeNonQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export { executeNonQuery, executeQuery };
