// src/main.js

/**
 * Archivo principal de la aplicación.
 * 
 * Este archivo inicializa la conexión a la base de datos SQLite y utiliza las clases 
 * `TableManager` y `UserManager` para realizar operaciones en la base de datos. 
 * Se utiliza una estructura modular, donde `TableManager` maneja la creación y 
 * verificación de tablas y `UserManager` gestiona las operaciones de usuarios, 
 * incluyendo la adición de usuarios nuevos con contraseñas encriptadas.
 * 
 * Dependencias:
 * - DatabaseConnection: Clase que establece y gestiona la conexión a la base de datos SQLite.
 * - TableManager: Clase responsable de la inicialización y gestión de tablas.
 * - UserManager: Clase que gestiona las operaciones de usuarios.
 */

import DatabaseConnection from './config/DatabaseConnection.js';
import TableManager from './managers/TableManager.js';
import UserManager from './managers/UserManager.js';

(async () => {
    /**
     * Punto de entrada principal de la aplicación.
     *
     * 1. Se crea una instancia de `DatabaseConnection` para establecer la conexión a la base de datos.
     * 2. Se inicializa `TableManager` para gestionar la verificación y creación de tablas necesarias.
     * 3. Se ejecuta `listTables()` en `TableManager` para listar todas las tablas actuales en la base de datos.
     * 4. Se inicializa `UserManager` para gestionar los usuarios y se agrega un usuario de ejemplo.
     * 5. Finalmente, se cierra la conexión a la base de datos.
     */
    const dbConnection = new DatabaseConnection();

    // Inicializa el gestor de tablas para verificar y crear las tablas necesarias
    const tableManager = new TableManager(dbConnection);
    tableManager.initializeTables();  // Crea tablas si no existen
    await tableManager.listTables();  // Lista las tablas en la base de datos

    // EJEMPLO - Inicializa el gestor de usuarios y agrega un usuario de ejemplo
    const userManager = new UserManager(dbConnection);
    const nombre = "Juan Pérez";
    const email = "juan.perez@example.com";
    const contraseña = "664545139";
    await userManager.addUser(nombre, email, contraseña);

    // Cierra la conexión a la base de datos
    dbConnection.close();
})();
