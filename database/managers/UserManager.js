import bcrypt from 'bcrypt';

/**
 * Clase UserManager
 * 
 * La clase `UserManager` gestiona la creación y manejo de usuarios en la base de datos,
 * proporcionando funciones como la adición de nuevos usuarios con verificación y encriptación de contraseña.
 * 
 * Métodos:
 * - `constructor(dbConnection)`: Inicializa el gestor de usuarios con una conexión de base de datos.
 * - `addUser(nombre, email, contraseña)`: Agrega un usuario nuevo a la base de datos, encriptando la contraseña.
 */
class UserManager {
    /**
     * Constructor de la clase UserManager.
     * 
     * Recibe una instancia de conexión de base de datos y la utiliza para ejecutar consultas
     * relacionadas con la administración de usuarios.
     *
     * @param {DatabaseConnection} dbConnection - Instancia de conexión a la base de datos.
     */
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    /**
     * Agrega un usuario nuevo a la base de datos.
     *
     * Este método verifica si el correo electrónico ya está en uso en la base de datos.
     * Si no está en uso, encripta la contraseña con `bcrypt` y luego inserta el usuario 
     * en la tabla `usuarios` con el nombre, email, y contraseña encriptada.
     *
     * @param {string} nombre - El nombre del usuario.
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} contraseña - La contraseña en texto plano del usuario.
     * 
     * @returns {Promise<void>} Una promesa que se resuelve cuando el usuario se ha insertado correctamente.
     * 
     * @throws {Error} Si ocurre un error durante la encriptación de la contraseña o la inserción en la base de datos.
     * 
     * **Errores**:
     * - Imprime un mensaje en la consola si el correo electrónico ya está en uso.
     * - Muestra un error en la consola si ocurre un fallo al encriptar la contraseña o al insertar el usuario.
     */
    async addUser(nombre, email, contraseña) {
        try {
            // Verifica si el correo electrónico ya existe
            const existingUser = await this.dbConnection.runQuery("SELECT * FROM usuarios WHERE email = ?", [email]);
            if (existingUser.length > 0) {
                console.log("Error: El correo electrónico ya está en uso.");
                return; 
            }
            
            // Encripta la contraseña antes de almacenarla
            const hashedPassword = await bcrypt.hash(contraseña, 10);
            
            // Inserta el nuevo usuario
            await this.dbConnection.runQuery(
                "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
                [nombre, email, hashedPassword]
            );
            console.log("Usuario agregado correctamente.");
        } catch (err) {
            console.error("Error al crear el usuario:", err.message);
        }
    }
}

export default UserManager;
