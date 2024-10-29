import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';

dotenv.config();

/**
 * Clase Database
 * 
 * Esta clase maneja la conexión y las operaciones en la base de datos SQLite. 
 * Se encarga de inicializar la base de datos, crear tablas, ejecutar consultas SQL 
 * de forma asincrónica y manejar la encriptación de contraseñas.
 *
 * La clase utiliza `dotenv` para cargar la configuración desde un archivo `.env`
 * y `bcrypt` para encriptar las contraseñas antes de almacenarlas.
 *
 * Métodos:
 * - `constructor()`: Inicializa la conexión y verifica la existencia de tablas.
 * - `initializeTables()`: Crea las tablas `usuarios` y `juegos` si no existen.
 * - `runQuery(query, params)`: Ejecuta consultas SQL de manera asíncrona.
 * - `addUser(nombre, email, contraseña)`: Agrega un usuario nuevo con contraseña encriptada.
 * - `close()`: Cierra la conexión a la base de datos.
 */
class Database {
    /**
     * Constructor de la clase Database
     *
     * Inicializa la conexión a la base de datos SQLite utilizando la ruta especificada
     * en el archivo `.env` o una ruta predeterminada. Verifica la conexión y, si es exitosa,
     * llama a `initializeTables()` para crear las tablas necesarias si no existen.
     *
     * Lanza un error si la ruta de la base de datos no está definida o si ocurre un problema
     * al conectarse a la base de datos.
     *
     * @throws {Error} Si la variable de entorno `DB_FILE` no está definida.
     */
    constructor() {
        if (!"./database/database.db") {
            throw new Error("La variable DB_FILE no está definida en el archivo .env");
        }

        this.db = new sqlite3.Database("./database/database.db", (err) => {
            if (err) {
                console.error("Error al conectar a la base de datos:", err.message);
            } else {
                console.log("Conexión exitosa a la base de datos SQLite.");
                this.initializeTables();
            }
        });
    }

    /**
     * Crea las tablas `usuarios` y `juegos` en la base de datos si no existen.
     *
     * Define las tablas `usuarios` y `juegos` con sus respectivas columnas y restricciones.
     * Ejecuta las consultas de creación de tablas utilizando `sqlite3.Database.run()`.
     * Muestra mensajes de confirmación o error según el resultado de cada consulta.
     *
     * Tablas:
     * - `usuarios`: Almacena información de usuarios con columnas `id`, `nombre`, `email`, `password`.
     * - `juegos`: Almacena información sobre juegos con columnas `id`, `titulo`, `descripcion`, `genero`.
     *
     * @returns {void}
     */
    initializeTables() {
        const createUsuariosTable = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `;

        const createJuegosTable = `
            CREATE TABLE IF NOT EXISTS juegos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                descripcion TEXT,
                genero TEXT
            );
        `;

        this.db.run(createUsuariosTable, (err) => {
            if (err) {
                console.error("Error al crear la tabla 'usuarios':", err.message);
            } else {
                console.log("Tabla 'usuarios' verificada o creada correctamente.");
            }
        });

        this.db.run(createJuegosTable, (err) => {
            if (err) {
                console.error("Error al crear la tabla 'juegos':", err.message);
            } else {
                console.log("Tabla 'juegos' verificada o creada correctamente.");
            }
        });
    }

    /**
     * Ejecuta una consulta SQL de manera asíncrona con parámetros opcionales.
     *
     * Utiliza el método `all()` de `sqlite3` para ejecutar consultas SQL que pueden incluir
     * parámetros. Retorna una promesa que se resuelve con los resultados de la consulta o se rechaza
     * en caso de error. Puede usarse para consultas de selección, inserción, actualización, o eliminación.
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
     * Agrega un usuario nuevo a la base de datos.
     *
     * Recibe el nombre, email, y contraseña de un usuario, encripta la contraseña
     * utilizando `bcrypt` y almacena el usuario en la tabla `usuarios`. Maneja errores
     * en el proceso de inserción y muestra un mensaje de éxito si el usuario se agrega correctamente.
     *
     * @param {string} nombre - El nombre del usuario.
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} contraseña - La contraseña en texto plano del usuario.
     * @returns {Promise<void>} Una promesa que se resuelve cuando el usuario es insertado correctamente.
     * @throws {Error} Si ocurre un error durante la encriptación de la contraseña o la inserción en la base de datos.
     */
    async addUser(nombre, email, contraseña) {
        try {
            const hashedPassword = await bcrypt.hash(contraseña, 10);
            
            await this.runQuery(
                "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
                [nombre, email, hashedPassword]
            );
            console.log("Usuario agregado correctamente.");
        } catch (err) {
            console.error("Error al crear el usuario:", err.message);
        }
    }

    /**
     * Cierra la conexión a la base de datos.
     *
     * Cierra la conexión activa a la base de datos SQLite. Muestra un mensaje de confirmación
     * si el cierre es exitoso, o un mensaje de error en caso de fallo.
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

// Ejemplo de uso: Listar tablas de la base de datos
(async () => {
    const database = new Database();
    await database.listTables();
    database.close();
})();

// Ejemplo de uso: Crear un nuevo usuario
(async () => {
    try {
        const database = new Database();

        // Agrega un nuevo usuario con los datos de ejemplo
        const nombre = "Juan Pérez";
        const email = "juan.perez@example.com";
        const contraseña = "664545139"; // Contraseña que será encriptada
        await database.addUser(nombre, email, contraseña);

        console.log("Usuario insertado correctamente.");

        database.close();
    } catch (error) {
        console.error("Error al insertar usuario:", error.message);
    }
})();
