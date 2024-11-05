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

        // Validaciones de los campos
        // Validar nombre: debe ser texto y no mayor a 50 caracteres
        if (typeof nombre !== 'string' || nombre.length > 50) {
            return res.status(400).send('El nombre debe ser un texto y no mayor a 50 caracteres.');
        }

        // Validar que imagen sea una URL que termine en ".png"
        const urlRegex = /^(https?:\/\/[^\s]+)$/;
        if (!urlRegex.test(imagen) || !imagen.endsWith('.png')) {
            return res.status(400).send('La imagen debe ser una URL válida que termine en ".png".');
        }

        // Validar que url sea una URL válida
        if (!urlRegex.test(url)) {
            return res.status(400).send('La URL de la página web debe ser una URL válida.');
        }

        // Validar que tipo sea uno de los valores permitidos y ajustar el valor de "acción" si corresponde
        const allowedTypes = ['cartas', 'mesa', 'accion'];
        let tipoNormalizado = tipo.replace('Juegos de ', '').toLowerCase();
        if (tipoNormalizado === 'acción') {
            tipoNormalizado = 'accion';
        }
        if (!allowedTypes.includes(tipoNormalizado)) {
            return res.status(400).send('El tipo debe ser uno de los siguientes: cartas, mesa, o accion.');
        }

        // Llamar a la función addGame con el tipo normalizado
        await boardService.addGame(nombre, imagen, url, tipoNormalizado);
        res.status(200).send('Agregado correctamente');
    } catch (error) {
        console.error(error);  // Es útil ver el error en consola para depuración
        res.status(500).send('Error al agregar el juego: ' + error.message);
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