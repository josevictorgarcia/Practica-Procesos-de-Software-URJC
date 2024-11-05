import DatabaseConnection from '../database/config/DatabaseConnection.js';
import GameManager from '../database/managers/GameManager.js';
import UserManager from '../database/managers/UserManager.js';

const user = null;
/*
const user = {
    nombre: "Username",
    foto: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/09/569465-whatsapp-que-tus-contactos-ponen-rana-perfil.jpg?tf=3840x"
};
*/

const posts = new Map([
    [1, new Map()], /*Juegos de cartas */
    [2, new Map()], /*Juegos de mesa */
    [3, new Map()]  /*Máquinas tragaperras */
]);
let nextId = 0;

/* Datos iniciales */
addPost({nombre: "Blackjack", imagen: "https://images.sigma.world/blackjack-card-counting-scaled-1.jpg", url: "https://www.gamepix.com/play/las-vegas-blackjack", tipo: "Juegos de cartas"});
addPost({nombre: "Parchis", imagen: "https://www.mora-play.com/mora/wp-content/uploads/2023/02/ref.-66-001-scaled.jpg", url: "https://www.ludoteka.com/juegos/parchis/parchis-individual-a-4", tipo: "Juegos de mesa"});
addPost({nombre: "Ruleta", imagen: "https://www.rockaxis.com/img/newsList/8047148.png", url: "https://es.piliapp.com/random/wheel/", tipo: "Juegos de mesa"});
addPost({nombre: "Juego Shooter", imagen: "https://images.crazygames.com/games/krunker-io/cover-1591336739727.png?auto=format,compress&q=75&cs=strip", url: "https://krunker.io", tipo: "Juegos de acción"});

const dbConnection = new DatabaseConnection();

export function isLogedIn(){
    if(!user){return (false, null)}
    return (true, user)
}

export function getUserData() {
    return user;
}

export function addPost(post) {
    let tipo;
    if (post.tipo === "Juegos de cartas") {
        tipo = 1;
    } else if (post.tipo === "Juegos de mesa") {
        tipo = 2; 
    } else if (post.tipo === "Juegos de acción") {
        tipo = 3;
    }
    
    let id = nextId++;
    post.id = id.toString();
    posts.get(tipo).set(post.id, post);
}

export async function getCartas() {
    const gameManager = new GameManager(dbConnection);
    await gameManager.initializeGames();
    const games = await gameManager.getGamesByType('cartas');
    console.log("Todos los juegos:", games);
    return games
}

export async function getMesa() {
    const gameService = new GameManager(dbConnection);
    return await gameService.getGamesByType('mesa'); // Asegúrate de que el tipo coincide con la base de datos
}

export async function getAccion() {
    const gameService = new GameManager(dbConnection);
    return await gameService.getGamesByType('accion'); // Asegúrate de que el tipo coincide con la base de datos
}

export async function addUser(nombre, email, contraseña, profile_src) {
    const userService = new UserManager(dbConnection);
    return await userService.addUser(nombre, email, contraseña, profile_src);
}

export async function verifyUser(email, contraseña) {
    const userService = new UserManager(dbConnection);
    return await userService.verifyUser(email, contraseña);
}

export async function getUserInfo(email) {
    const userService = new UserManager(dbConnection);
    return await userService.getUserInfo(email);
}