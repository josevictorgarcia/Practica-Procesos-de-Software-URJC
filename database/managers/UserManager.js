import bcrypt from 'bcrypt';
import { executeNonQuery, executeQuery } from '../config/DatabaseConector.js';

/**
 * 
 * Clase UserManager
 * 
 * La clase `UserManager` gestiona la creación y manejo de usuarios en la base de datos SQLite3,
 * proporcionando funciones como la adición de nuevos usuarios con verificación y encriptación de contraseña.
 * 
 * Métodos:
 * - `constructor()`: Inicializa el gestor de usuarios.
 * - `addUser(nombre, email, contraseña, profileSrc)`: Agrega un usuario nuevo a la base de datos, encriptando la contraseña.
 * - `verifyUser(email, contraseña)`: Verifica si un usuario existe y si la contraseña proporcionada es válida.
 * - `getUserInfo(email)`: Devuelve la información de un usuario si el correo existe.
 */

class UserManager {
    /**
     * Constructor de la clase UserManager.
     */
    constructor() {
        // No necesita una conexión a la base de datos, ya que utiliza las funciones exportadas
    }

    /**
     * Agrega un usuario nuevo a la base de datos SQLite3.
     *
     * Este método verifica si el correo electrónico ya está en uso en la base de datos.
     * Si no está en uso, encripta la contraseña con `bcrypt` y luego inserta el usuario 
     * en la tabla `usuarios` con el nombre, email, contraseña encriptada y perfil.
     *
     * @param {string} nombre - El nombre del usuario.
     * @param {string} email - El correo electrónico del usuario.
     * @param {string} contraseña - La contraseña en texto plano del usuario.
     * @param {string} profileSrc - La URL de la imagen de perfil del usuario.
     * 
     * @returns {Promise<string>} Una promesa que se resuelve cuando el usuario se ha insertado correctamente.
     * 
     * @throws {Error} Si ocurre un error durante la encriptación de la contraseña o la inserción en la base de datos.
     */
    async addUser(nombre, email, contraseña, profileSrc) {
        try {
            const existingUser = await executeQuery("SELECT * FROM usuarios WHERE email = ?", [email]);
            if (existingUser.length > 0) {
                throw new Error("El correo electrónico ya está en uso.");
            }

            const hashedPassword = await bcrypt.hash(contraseña, 10);
            await executeNonQuery(
                "INSERT INTO usuarios (nombre, email, password, profile_src) VALUES (?, ?, ?, ?)",
                [nombre, email, hashedPassword, profileSrc]
            );
            return 'Registro de usuario exitoso';
        } catch (err) {
            console.error("Error al crear el usuario:", err.message);
            throw new Error("Error al crear el usuario: " + err.message);
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
            // Verifica si el correo electrónico existe en la base de datos, incluyendo la contraseña
            const user = await executeQuery("SELECT nombre, email, profile_src, password FROM usuarios WHERE email = ?", [email]);
            
            if (user.length === 0) {
                return false; // No se encontró el usuario
            }
    
            // Verifica la contraseña usando bcrypt
            const isPasswordValid = await bcrypt.compare(contraseña, user[0].password);
            if (!isPasswordValid) {
                return false; // Contraseña incorrecta
            }
    
            // Retorna solo la información del usuario sin la contraseña
            return {
                nombre: user[0].nombre,
                email: user[0].email,
                profile_src: user[0].profile_src
            };
        } catch (err) {
            console.error("Error al verificar el usuario:", err.message);
            return false; // Retorna false en caso de error
        }
    }

    /**
     * Obtiene la información de un usuario por su correo electrónico.
     *
     * Este método consulta la base de datos SQLite3 para obtener la información de un usuario
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
            const user = await executeQuery("SELECT nombre, email, profile_src FROM usuarios WHERE email = ?", [email]);
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

