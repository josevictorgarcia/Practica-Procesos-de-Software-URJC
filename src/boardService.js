import GameManager from '../database/managers/GameManager.js';
import UserManager from '../database/managers/UserManager.js';

const user = null;
/*
const user = {
    nombre: "Username",
    foto: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/09/569465-whatsapp-que-tus-contactos-ponen-rana-perfil.jpg?tf=3840x"
};
*/

export function isLogedIn(){
    if(!user){return (false, null)}
    return (true, user)
}

export async function getUserData(email) {
    const userManager = new UserManager();
    try {
        const userInfo = await userManager.getUserInfo(email);
        return userInfo; // Devuelve el userInfo
    } catch (error) {
        console.error(error);
        throw error; // Opcional: vuelve a lanzar el error para manejarlo en otro lugar
    }
}

export async function getCartas() {
    const gameManager = new GameManager();
    return await gameManager.getAllGames("cartas");
}

export async function getMesa() {
    const gameManager = new GameManager();
    return await gameManager.getAllGames("mesa");
}

export async function getAccion() {
    const gameManager = new GameManager();
    return await gameManager.getAllGames("accion");
}

export async function addUser(nombre, email, contraseña, profile_src) {
    const userService = new UserManager();
    return await userService.addUser(nombre, email, contraseña, profile_src);
}

export async function verifyUser(email, contraseña) {
    const userService = new UserManager();
    return await userService.verifyUser(email, contraseña);
}

export async function getUserInfo(email) {
    const userService = new UserManager();
    return await userService.getUserInfo(email);
}