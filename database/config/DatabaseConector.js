import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import { __dirname } from './../../src/dirname.js';

dotenv.config();

// Set the path to your SQLite3 database file
const databasePath = __dirname + "/../database/database.db";

if (!databasePath) {
  console.error('La ruta de la base de datos no está definida en las variables de entorno.');
  process.exit(1); // Salir con un error si no se ha encontrado la variable de entorno
}

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
