import GameManager from '../database/managers/GameManager.js';
import UserManager from '../database/managers/UserManager.js';

var user = null;

/*
const user = {
    nombre: 'John Doe',
    email: 'john.doe@example.com',
    profile_src: 'https://example.com/profile.jpg'
}
*/

/**
 * Verifica si un usuario está conectado.
 * @returns {Array} Un arreglo donde el primer elemento es un booleano indicando si el usuario está logueado,
 *                  y el segundo elemento es el objeto de usuario o null.
 */
export function isLogedIn() {
    if (!user) { return (false, null); }
    return (true, user);
}

/**
 * Obtiene la información de un usuario basado en su correo electrónico.
 * @param {string} email - El correo electrónico del usuario.
 * @returns {Promise<object>} Promesa que se resuelve con la información del usuario.
 * @throws {Error} Lanza un error si ocurre un problema al obtener la información del usuario.
 */
export async function getUserData(email) {
    const userManager = new UserManager();
    try {
        return await userManager.getUserInfo(email);; // Devuelve el userInfo
    } catch (error) {
        console.error(error);
        throw error; // Opcional: vuelve a lanzar el error para manejarlo en otro lugar
    }
}

/**
 * Obtiene todos los juegos de tipo "cartas".
 * @returns {Promise<Array>} Promesa que se resuelve con un arreglo de juegos de cartas.
 */
export async function getCartas() {
    const gameManager = new GameManager();
    return await gameManager.getAllGames("cartas");
}

/**
 * Obtiene todos los juegos de tipo "mesa".
 * @returns {Promise<Array>} Promesa que se resuelve con un arreglo de juegos de mesa.
 */
export async function getMesa() {
    const gameManager = new GameManager();
    return await gameManager.getAllGames("mesa");
}

/**
 * Obtiene todos los juegos de tipo "acción".
 * @returns {Promise<Array>} Promesa que se resuelve con un arreglo de juegos de acción.
 */
export async function getAccion() {
    const gameManager = new GameManager();
    return await gameManager.getAllGames("accion");
}

export async function addGame(nombre, imagen, url, tipo) {
    const gameService = new GameManager();
    return await gameService.addGame(nombre, imagen, url, tipo);
}


/**
 * Agrega un nuevo usuario a la base de datos.
 * @param {string} nombre - El nombre del usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} contraseña - La contraseña del usuario.
 * @param {string} profile_src - La URL de la imagen de perfil del usuario.
 * @returns {Promise<void>} Promesa que se resuelve al agregar el usuario.
 */
export async function addUser(nombre, email, contraseña, profile_src) {
    const userService = new UserManager();
    return await userService.addUser(nombre, email, contraseña, profile_src);
}

/**
 * Verifica las credenciales de un usuario y actualiza la variable `user` si las credenciales son válidas.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} contraseña - La contraseña del usuario.
 * @returns {Promise<boolean>} Promesa que se resuelve con true si el usuario fue verificado,
 *                             o false si las credenciales son inválidas.
 */
export async function verifyUser(email, contraseña) {
    const userService = new UserManager();
    try {
        const verifiedUser = await userService.verifyUser(email, contraseña);
        user = verifiedUser || user; // Asigna verifiedUser a user si existe, de lo contrario, conserva el valor anterior
        return !!verifiedUser; // Retorna true si verifiedUser existe, false de lo contrario
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * Obtiene la información de un usuario basado en su correo electrónico.
 * @param {string} email - El correo electrónico del usuario.
 * @returns {Promise<object>} Promesa que se resuelve con la información del usuario.
 */
export async function getUserInfo(email) {
    const userService = new UserManager();
    return await userService.getUserInfo(email);
}


/**
 * Actualiza la URL de la imagen de perfil de un usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} newProfileSrc - La nueva URL de la imagen de perfil.
 * @returns {Promise<string>} Una promesa que se resuelve con un mensaje de éxito o error.
 */
export async function updateProfileImage(email, newProfileSrc) {
    const userService = new UserManager();
    try {
        const message = await userService.updateProfileSrc(email, newProfileSrc);
        return message; // Mensaje de éxito de la actualización
    } catch (error) {
        console.error("Error actualizando imagen de perfil:", error.message);
        throw new Error(error.message); // Lanza el error en caso de fallo
    }
}

/** Cierra sesion del usuario */
export async function logout() {
    user = null
    return true
}

// Ejemplo de uso
    // (async () => {
    //     try {
    //         const email = "john.doe@example.com";
    //         const password = "mypassword";
    //         const loggedInUser = await verifyUser(email, password);
    //         console.log("Usuario verificado:", loggedInUser);
    //         console.log(user);
    //     } catch (error) {
    //         console.error("Error de verificación:", error.message);
    //     }
    // })();