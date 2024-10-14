import express from "express";
import * as boardService from './boardService.js';

const router = express.Router();

router.get('/', (req, res) => {
    
    const cartas = boardService.getCartas();
    const mesa = boardService.getMesa();
    const tragaperras = boardService.getTragaperras();

    res.render('index', {cartas, mesa, tragaperras})

})

router.get('/newItem', (req, res) => {
    
    res.render('new', {

    })

})

/*Añade un post y define sus componentes */
router.post('/post/edit', (req, res) => {
    let { nombre, imagen, url, tipo } = req.body;

    boardService.addPost({ nombre, imagen, url, tipo }, req.body.id);
    res.redirect('/');//nos redirige a la pagina index
});


export default router;