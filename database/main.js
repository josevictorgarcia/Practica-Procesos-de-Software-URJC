// src/main.js

/**
 * Archivo principal de la aplicación.
 * 
 * Este archivo inicializa la conexión a la base de datos SQLite y utiliza las clases 
 * `TableManager`, `UserManager` y `GameManager` para realizar operaciones en la base de datos. 
 * Se utiliza una estructura modular, donde `TableManager` maneja la creación y 
 * verificación de tablas, `UserManager` gestiona las operaciones de usuarios, 
 * y `GameManager` gestiona los juegos.
 * 
 * Dependencias:
 * - DatabaseConnection: Clase que establece y gestiona la conexión a la base de datos SQLite.
 * - TableManager: Clase responsable de la inicialización y gestión de tablas.
 * - UserManager: Clase que gestiona las operaciones de usuarios.
 * - GameManager: Clase que gestiona las operaciones relacionadas con los juegos.
 */

import DatabaseConnection from './config/DatabaseConnection.js';
import TableManager from './managers/TableManager.js';

(async () => {
    /**
     * Punto de entrada principal de la aplicación.
     *
     * 1. Se crea una instancia de `DatabaseConnection` para establecer la conexión a la base de datos.
     * 2. Se inicializa `TableManager` para gestionar la verificación y creación de tablas necesarias.
     * 3. Se ejecuta `listTables()` en `TableManager` para listar todas las tablas actuales en la base de datos.
     * 4. Se inicializa `UserManager` para gestionar los usuarios y se agrega un usuario de ejemplo.
     * 5. Se inicializa `GameManager` para gestionar los juegos y cargar los juegos iniciales.
     * 6. Finalmente, se cierra la conexión a la base de datos.
     */
    const dbConnection = new DatabaseConnection();

    // Inicializa el gestor de tablas para verificar y crear las tablas necesarias
    const tableManager = new TableManager(dbConnection);
    await tableManager.initializeTables();  // Crea tablas si no existen
    await tableManager.listTables();

    // EJEMPLO - Inicializa el gestor de juegos y carga los juegos iniciales
    // const gameManager = new GameManager(dbConnection);
    // await gameManager.initializeGames(); // Carga los juegos iniciales EJECUTAR UNA VEZ AL CREAR TABLA

    // Cierra la conexión a la base de datos
    dbConnection.close();
})();