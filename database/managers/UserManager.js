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
 * - `verifyUser(email, contraseña)`: Verifica si un usuario existe y si la contraseña proporcionada es válida.
 * - `getUserInfo(email)`: Devuelve la información de un usuario si el correo existe.
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
     */
    async addUser(nombre, email, contraseña) {
        try {
            const existingUser = await this.dbConnection.runQuery("SELECT * FROM usuarios WHERE email = ?", [email]);
            if (existingUser.length > 0) {
                console.log("Error: El correo electrónico ya está en uso.");
                return; 
            }
            
            const hashedPassword = await bcrypt.hash(contraseña, 10);
            await this.dbConnection.runQuery(
                "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
                [nombre, email, hashedPassword]
            );
            console.log("Usuario agregado correctamente.");
        } catch (err) {
            console.error("Error al crear el usuario:", err.message);
        }
    }

    /**
     * Verifica si el usuario con el correo y contraseña proporcionados existe.
     *
     * Este método primero verifica si el correo electrónico proporcionado existe en la base de datos.
     * Si existe, compara la contraseña en texto plano con la contraseña encriptada almacenada.
     * Si alguna verificación falla, devuelve un mensaje de error de credenciales inválidas.
     *
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} contraseña - La contraseña en texto plano del usuario.
     * 
     * @returns {Promise<string>} Una promesa que se resuelve con un mensaje de éxito o de error.
     * 
     * @throws {Error} Si ocurre un error en la verificación de credenciales.
     */
    async verifyUser(email, contraseña) {
        try {
            // Verifica si el correo electrónico existe en la base de datos
            const user = await this.dbConnection.runQuery("SELECT * FROM usuarios WHERE email = ?", [email]);
            if (user.length === 0) {
                throw new Error("Credenciales inválidas");
            }

            // Verifica la contraseña usando bcrypt
            const isPasswordValid = await bcrypt.compare(contraseña, user[0].password);
            if (!isPasswordValid) {
                throw new Error("Credenciales inválidas");
            }

            return "Inicio de sesión exitoso";
        } catch (err) {
            console.error("Error al verificar el usuario:", err.message);
            throw new Error("Error: vuelvalo a intentar más tarde");
        }
    }

    /**
     * Obtiene la información de un usuario por su correo electrónico.
     *
     * Este método consulta la base de datos para obtener la información de un usuario
     * dado su correo electrónico. Si el usuario no existe, lanza un error de "Usuario no encontrado".
     *
     * @param {string} email - El correo electrónico del usuario.
     * 
     * @returns {Promise<Object>} Una promesa que se resuelve con un objeto que contiene
     *                            la información del usuario (excluyendo la contraseña).
     * 
     * @throws {Error} Si el usuario no se encuentra en la base de datos.
     */
    async getUserInfo(email) {
        try {
            const user = await this.dbConnection.runQuery("SELECT id, nombre, email FROM usuarios WHERE email = ?", [email]);
            if (user.length === 0) {
                throw new Error("Usuario no encontrado");
            }

            // Retorna la información del usuario sin incluir la contraseña
            return user[0];
        } catch (err) {
            console.error("Error al obtener información del usuario:", err.message);
            throw new Error("Usuario no encontrado");
        }
    }
}

export default UserManager;
