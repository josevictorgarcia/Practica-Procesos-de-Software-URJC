import express from "express";
import * as boardService from './boardService.js';

const router = express.Router();

router.get('/', async (req, res) => { // Cambia a función asíncrona
    try {
        // Usa await para obtener los datos
        const cartas = await boardService.getCartas(); // Espera a que se resuelva la promesa
        const mesa = await boardService.getMesa(); // Espera a que se resuelva la promesa
        const accion = await boardService.getAccion(); // Espera a que se resuelva la promesa
        const user = await boardService.isLogedIn();
        let nombre, foto
        if(user){
            nombre = user.nombre;
            foto = user.profile_src;
        }

        // Renderiza la vista pasando los datos
        res.render('index', {user,nombre,foto,cartas, mesa, accion});
    } catch (error) {
        console.error("Error al obtener los juegos:", error);
        res.status(500).send("Error al obtener los juegos");
    }
})

// GET route for login
router.get("/login", (req, res) => {
    res.render('log_sign', {
        form: "login" // Indica que se debe mostrar el formulario de inicio de sesión
    });
});

// GET route for signup
router.get("/signup", (req, res) => {
    res.render('log_sign', {
        form: "signup" // Indica que se debe mostrar el formulario de registro
    });
});

// POST route for login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const isVerified = await boardService.verifyUser(email, password);

        if (isVerified) {
            res.redirect("/");
        } else {
            res.status(401).render('log_sign', {
                errorMessageLogin: "Correo electrónico o contraseña incorrectos.",
                form: "login" // Indica que el formulario de inicio de sesión debería mostrarse
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).render('log_sign', {
            errorMessageLogin: "Error al iniciar sesión: " + error.message,
            form: "login"
        });
    }
});

// POST route for signup
router.post("/signup", async (req, res) => {
    const { email, username, password } = req.body;

    try {
        await boardService.addUser(username, email, password, null);
        res.redirect("/login");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).render('log_sign', {
            errorMessageSignup: "Error al crear el usuario: " + error.message,
            form: "signup" // Indica que el formulario de registro debería mostrarse
        });
    }
});

router.get('/logout', async (req, res) => {
    await boardService.logout()
    res.redirect('/'); // Redirige a la página principal
});

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