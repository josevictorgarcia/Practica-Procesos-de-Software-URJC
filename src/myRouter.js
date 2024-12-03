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
    res.render('login', {
        form: "loginForm" // Indica que se debe mostrar el formulario de inicio de sesión
    });
});

// GET route for signup
router.get("/signup", (req, res) => {
    res.render('signup', {
        form: "signupForm" // Indica que se debe mostrar el formulario de registro
    });
});

// POST route for login
router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
        // Convertir el correo electrónico a cadena y validar el formato
        email = String(email).trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).render('login', {
                errorMessageLogin: "Por favor ingresa un correo electrónico válido.",
                form: "login"
            });
        }

        // Convertir la contraseña a cadena y validar longitud y caracteres especiales
        password = String(password).trim();
        if (password.length < 6 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).render('login', {
                errorMessageLogin: "La contraseña debe tener al menos 6 caracteres, incluyendo letras, números y caracteres especiales.",
                form: "login"
            });
        }

        // Verificar el usuario
        const isVerified = await boardService.verifyUser(email, password);

        if (isVerified) {
            res.redirect("/");
        } else {
            res.status(401).render('login', {
                errorMessageLogin: "Correo electrónico o contraseña incorrectos.",
                form: "login"
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).render('login', {
            errorMessageLogin: "Error al iniciar sesión: " + error.message,
            form: "login"
        });
    }
});

// POST route for signup
router.post("/signup", async (req, res) => {
    let { email, name, password } = req.body;

    try {
        // Convertir el nombre a cadena
        name = String(name).trim();
        if (!name || name.length < 3) {
            return res.status(400).render('signup', {
                errorMessageSignup: "El nombre debe tener al menos 3 caracteres.",
                form: "signup"
            });
        }

        // Convertir el correo electrónico a cadena y validar el formato
        email = String(email).trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).render('signup', {
                errorMessageSignup: "Por favor ingresa un correo electrónico válido.",
                form: "signup"
            });
        }

        // Convertir la contraseña a cadena y validar longitud y caracteres especiales
        password = String(password).trim();
        if (password.length < 6 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).render('signup', {
                errorMessageSignup: "La contraseña debe tener al menos 6 caracteres, incluyendo letras, números y caracteres especiales.",
                form: "signup"
            });
        }

        // Establecer una imagen de perfil predeterminada
        const default_profile_image = 'data:image/jpeg;base64,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'
        
        const user_sign_up = await boardService.addUser(name, email, password, default_profile_image);
        const isVerified = await boardService.verifyUser(email, password);

        if (user_sign_up && isVerified) {
            res.redirect("/");
        }
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).render('signup', {
            errorMessageSignup: "Error al crear el usuario: " + error.message,
            form: "signup"
        });
    }
});


router.get('/logout', async (req, res) => {
    await boardService.logout()
    res.redirect('/'); // Redirige a la página principal
});

router.get('/newGame', async (req, res) => {
    const user = await boardService.isLogedIn();
    if (!user) {
        return res.redirect('/login');
    }
    res.render('new', { user });
});

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
        if (await boardService.addGame(nombre, imagen, url, tipoNormalizado)){
            res.status(200).send('Juego agregado corrcetamente');
        }

        res.status(200).redirect('/')
    } catch (error) {
        console.error(error);  // Es útil ver el error en consola para depuración
        res.status(500).send('Error al agregar el juego: ' + error.message);
    }
});

// GET route for edit profile
router.get('/profile', async (req, res) => {
    const user = await boardService.isLogedIn();
    if (!user) {
        return res.redirect('/login');
    }
    const defaultProfileImage = 'data:image/jpeg;base64,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';
    const isDefaultImage = user.profile_src === defaultProfileImage;
    res.render('profile', { user, isDefaultImage });
});

// POST route for editing profile
router.post('/post/edit', async (req, res) => {
    try {
        let { email, imagen } = req.body;
        //console.log("Email:", email); // Debugging statement
        //console.log("Imagen:", imagen); // Debugging statement

        if (await boardService.updateProfileImage(email, imagen)){
            res.redirect('/');//nos redirige a la pagina index
        }
        

    } catch (error) {
        console.error(error);  // Es útil ver el error en consola para depuración
        res.status(500).send('Error al cambiar la imagen: ' + error.message);
    }
});

router.get('/game', async (req, res) => { // Cambia a función asíncrona
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
        res.render('game', {user,nombre,foto,cartas, mesa, accion});
    } catch (error) {
        console.error("Error al obtener los juegos:", error);
        res.status(500).send("Error al obtener los juegos");
    }
})

export default router;
