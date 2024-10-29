import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';

dotenv.config();

/**
 * Clase DatabaseConnection
 * 
 * Esta clase gestiona la conexión con una base de datos SQLite, cargando la configuración
 * desde un archivo `.env` y estableciendo una conexión con la base de datos en la ruta 
 * especificada en la variable de entorno `DB_FILE`. También proporciona métodos para 
 * ejecutar consultas SQL de forma asíncrona y cerrar la conexión.
 *
 * Métodos:
 * - `constructor()`: Inicializa la conexión a la base de datos.
 * - `runQuery(query, params)`: Ejecuta consultas SQL asíncronas con parámetros.
 * - `close()`: Cierra la conexión a la base de datos.
 */
class DatabaseConnection {
    /**
     * Constructor de la clase DatabaseConnection
     * 
     * Establece la conexión a la base de datos SQLite utilizando la ruta especificada 
     * en `process.env.DB_FILE`. Verifica si `DB_FILE` está definida y lanza un error 
     * si no lo está. En caso de éxito, confirma la conexión con un mensaje en consola.
     * 
     * @throws {Error} Si la variable de entorno `DB_FILE` no está definida.
     */
    constructor() {
        const dbFilePath = process.env.DB_FILE;
        if (!dbFilePath) {
            throw new Error("La variable DB_FILE no está definida en el archivo .env");
        }

        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.error("Error al conectar a la base de datos:", err.message);
            } else {
                console.log("Conexión exitosa a la base de datos SQLite.");
            }
        });
    }

    /**
     * Ejecuta una consulta SQL de manera asíncrona.
     *
     * Este método toma una consulta SQL y un arreglo opcional de parámetros, y la ejecuta 
     * utilizando `sqlite3.Database.all`. Retorna una promesa que se resuelve con los resultados 
     * de la consulta o se rechaza en caso de error.
     *
     * @param {string} query - La consulta SQL a ejecutar.
     * @param {Array} [params=[]] - Un arreglo opcional de parámetros para la consulta.
     * @returns {Promise<Array>} Una promesa que se resuelve con los resultados de la consulta en forma de arreglo.
     * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
     */
    runQuery(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    console.error("Error al realizar la consulta:", err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Cierra la conexión a la base de datos.
     *
     * Este método cierra la conexión activa a la base de datos SQLite. Si el cierre 
     * es exitoso, se muestra un mensaje de confirmación; en caso de fallo, se muestra 
     * un mensaje de error.
     *
     * @returns {void}
     * @throws {Error} Si ocurre un error al cerrar la base de datos.
     */
    close() {
        this.db.close((err) => {
            if (err) {
                console.error("Error al cerrar la base de datos:", err.message);
            } else {
                console.log("Conexión a la base de datos cerrada.");
            }
        });
    }
}

export default DatabaseConnection;
