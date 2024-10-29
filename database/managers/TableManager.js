/**
 * Clase TableManager
 * 
 * La clase `TableManager` administra la creación y verificación de tablas en la base de datos,
 * permitiendo inicializar las tablas necesarias y listar las existentes. Está diseñada para 
 * trabajar en conjunto con una conexión de base de datos SQLite proporcionada por `DatabaseConnection`.
 *
 * Métodos:
 * - `constructor(dbConnection)`: Inicializa el gestor de tablas con una conexión de base de datos.
 * - `initializeTables()`: Crea las tablas `usuarios` y `juegos` si no existen.
 * - `listTables()`: Lista todas las tablas existentes en la base de datos.
 */
class TableManager {
    /**
     * Constructor de la clase TableManager.
     * 
     * Recibe una instancia de conexión de base de datos y la utiliza para ejecutar 
     * consultas relacionadas con la creación y verificación de tablas.
     *
     * @param {DatabaseConnection} dbConnection - Instancia de conexión a la base de datos.
     */
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    /**
     * Crea las tablas `usuarios` y `juegos` en la base de datos si no existen.
     *
     * Ejecuta consultas SQL para crear las tablas `usuarios` y `juegos` con las siguientes columnas:
     * - `usuarios`: Contiene `id`, `nombre`, `email`, y `password`, con una restricción `UNIQUE` en `email`.
     * - `juegos`: Contiene `id`, `titulo`, `descripcion`, y `genero`.
     *
     * Las consultas se ejecutan de forma asíncrona, y el método imprime un mensaje de éxito o error
     * en la consola dependiendo del resultado de cada consulta.
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
                tipo TEXT
            );
        `;

        this.dbConnection.runQuery(createUsuariosTable).then(() => {
            console.log("Tabla 'usuarios' verificada o creada correctamente.");
        }).catch(err => {
            console.error("Error al crear la tabla 'usuarios':", err.message);
        });

        this.dbConnection.runQuery(createJuegosTable).then(() => {
            console.log("Tabla 'juegos' verificada o creada correctamente.");
        }).catch(err => {
            console.error("Error al crear la tabla 'juegos':", err.message);
        });
    }

    /**
     * Lista todas las tablas en la base de datos.
     * 
     * Ejecuta una consulta SQL que selecciona los nombres de todas las tablas en la base de datos
     * y las imprime en la consola. Si ocurre un error, muestra un mensaje con los detalles del error.
     *
     * No recibe argumentos.
     *
     * @returns {Promise<void>} Una promesa que se resuelve cuando la lista de tablas se imprime.
     * @throws {Error} Si ocurre un error al listar las tablas.
     */
    async listTables() {
        try {
            const rows = await this.dbConnection.runQuery("SELECT name FROM sqlite_master WHERE type='table'");
            console.log("Tablas en la base de datos:");
            rows.forEach(row => console.log(row.name));
        } catch (err) {
            console.error("Error al listar las tablas:", err.message);
        }
    }
}

export default TableManager;
