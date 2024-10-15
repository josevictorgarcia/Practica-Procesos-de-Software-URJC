const posts = new Map([
    [1, new Map()], /*Juegos de cartas */
    [2, new Map()], /*Juegos de mesa */
    [3, new Map()]  /*Máquinas tragaperras */
]);
let nextId = 0;
/*Datos iniciales */
addPost({nombre: "Blackjack", imagen: "https://images.sigma.world/blackjack-card-counting-scaled-1.jpg", url: "https://www.gamepix.com/play/las-vegas-blackjack", tipo: "Juegos de cartas"});
addPost({nombre: "Parchis", imagen: "https://www.mora-play.com/mora/wp-content/uploads/2023/02/ref.-66-001-scaled.jpg", url: "https://www.ludoteka.com/juegos/parchis/parchis-individual-a-4", tipo: "Juegos de mesa"});
addPost({nombre: "Ruleta", imagen: "https://www.rockaxis.com/img/newsList/8047148.png", url: "https://es.piliapp.com/random/wheel/", tipo: "Juegos de mesa"});
addPost({nombre: "Juego Shooter", imagen: "https://images.crazygames.com/games/krunker-io/cover-1591336739727.png?auto=format,compress&q=75&cs=strip", url: "https://krunker.io", tipo: "Juegos de acción"});
addPost({nombre: "Juego Shooter", imagen: "https://images.crazygames.com/games/krunker-io/cover-1591336739727.png?auto=format,compress&q=75&cs=strip", url: "https://krunker.io", tipo: "Juegos de acción"});
addPost({nombre: "Juego Shooter", imagen: "https://images.crazygames.com/games/krunker-io/cover-1591336739727.png?auto=format,compress&q=75&cs=strip", url: "https://krunker.io", tipo: "Juegos de acción"});
addPost({nombre: "Juego Shooter", imagen: "https://images.crazygames.com/games/krunker-io/cover-1591336739727.png?auto=format,compress&q=75&cs=strip", url: "https://krunker.io", tipo: "Juegos de acción"});
addPost({nombre: "Juego Shooter", imagen: "https://images.crazygames.com/games/krunker-io/cover-1591336739727.png?auto=format,compress&q=75&cs=strip", url: "https://krunker.io", tipo: "Juegos de acción"});
addPost({nombre: "Juego Shooter", imagen: "https://images.crazygames.com/games/krunker-io/cover-1591336739727.png?auto=format,compress&q=75&cs=strip", url: "https://krunker.io", tipo: "Juegos de acción"});

export function addPost(post) {
    ///En este apartado se comprueba que el post a crear existe o no, si no existe se le añade con el nuevo id. Pero, si existe se modifica dato a dato el post y se repostea con los nuevos datos///
    let tipo
    if (post.tipo === "Juegos de cartas"){
        tipo = 1;
    } else if (post.tipo === "Juegos de mesa"){
        tipo = 2; 
    } else if (post.tipo === "Juegos de acción"){
        tipo = 3;
    }
    
    let id = nextId++;
    post.id = id.toString();
    posts.get(tipo).set(post.id, post);
}

export function getCartas() {
    let values = [...posts.get(1).values()];
    return values;
}

export function getMesa() {
    let values = [...posts.get(2).values()];
    return values;
}

export function getAccion() {
    let values = [...posts.get(3).values()];
    return values;
}