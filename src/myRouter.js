import express from "express";
import * as boardService from './boardService.js';

const router = express.Router();

router.get('/', async (req, res) => { // Cambia a función asíncrona
    try {
        // Usa await para obtener los datos
        const cartas = await boardService.getCartas(); // Espera a que se resuelva la promesa
        const mesa = await boardService.getMesa(); // Espera a que se resuelva la promesa
        const accion = await boardService.getAccion(); // Espera a que se resuelva la promesa
        const user = boardService.isLogedIn();
        let nombre;
        let foto;
        if(user){
            const userData = boardService.getUserData();
            nombre = userData.nombre;
            foto = userData.foto;
        }

        // Renderiza la vista pasando los datos
        res.render('index', {user,nombre,foto,cartas, mesa, accion});
    } catch (error) {
        console.error("Error al obtener los juegos:", error);
        res.status(500).send("Error al obtener los juegos");
    }
})

router.get("/login", (req, res) => {
    // Implementa la lógica de inicio de sesión
    res.render('log_sign', {});
})

router.get("/signup", (req, res) => {
    // Implementa la lógica de registro
    res.render('log_sign', {});
})

router.get('/newGame', (req, res) => {
    res.render('new', {});
})

router.post('/newGame', express.json(), async (req, res) => {
    try {
        // Desestructurar los parámetros del JSON recibido
        const { nombre, imagen, url, tipo } = req.body;

        // Asegúrate de que la función addGame sea asíncrona si interactúa con la base de datos
        await boardService.addGame(nombre, imagen, url, tipo);
        res.status(200).send("Agregado correctamente");
    } catch (error) {
        console.error(error);  // Es útil ver el error en consola para depuración
        res.status(500).send("Error al agregar el juego: " + error.message);
    }
});


router.get('/profile', (req, res) => { 
    res.render('profile');
});

/*Añade un post y define sus componentes */
router.post('/post/edit', (req, res) => {
    let { nombre, imagen, url, tipo } = req.body;

    boardService.addPost({ nombre, imagen, url, tipo }, req.body.id);
    res.redirect('/');//nos redirige a la pagina index
});

export default router;