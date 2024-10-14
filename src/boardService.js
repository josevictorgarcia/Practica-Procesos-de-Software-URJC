const posts = new Map([
    [1, new Map()], /*Juegos de cartas */
    [2, new Map()], /*Juegos de mesa */
    [3, new Map()]  /*Máquinas tragaperras */
]);
let nextId = 0;

/*Datos iniciales */
addPost({nombre: "Blackjack", imagen: "https://images.sigma.world/blackjack-card-counting-scaled-1.jpg", url: "https://www.gamepix.com/play/las-vegas-blackjack", tipo: "Juegos de cartas"});
addPost({nombre: "Ruleta", imagen: "https://www.rockaxis.com/img/newsList/8047148.png", url: "https://es.piliapp.com/random/wheel/", tipo: "Juegos de mesa"});
addPost({nombre: "Slot Machine", imagen: "https://media.istockphoto.com/id/817307644/vector/jackpot-slot-casino-machine-vector-one-arm-bandit.jpg?s=612x612&w=0&k=20&c=kX6YBt8SCFJCRYQ4cpyLZG0lMFVTTjVuhiVqeNSFdlI=", url: "https://www.freeslots.com/Slot3.htm", tipo: "Máquinas tragaperras"});
addPost({nombre: "Slot Machine", imagen: "https://media.istockphoto.com/id/817307644/vector/jackpot-slot-casino-machine-vector-one-arm-bandit.jpg?s=612x612&w=0&k=20&c=kX6YBt8SCFJCRYQ4cpyLZG0lMFVTTjVuhiVqeNSFdlI=", url: "https://www.freeslots.com/Slot3.htm", tipo: "Máquinas tragaperras"});
addPost({nombre: "Slot Machine", imagen: "https://media.istockphoto.com/id/817307644/vector/jackpot-slot-casino-machine-vector-one-arm-bandit.jpg?s=612x612&w=0&k=20&c=kX6YBt8SCFJCRYQ4cpyLZG0lMFVTTjVuhiVqeNSFdlI=", url: "https://www.freeslots.com/Slot3.htm", tipo: "Máquinas tragaperras"});
addPost({nombre: "Slot Machine", imagen: "https://media.istockphoto.com/id/817307644/vector/jackpot-slot-casino-machine-vector-one-arm-bandit.jpg?s=612x612&w=0&k=20&c=kX6YBt8SCFJCRYQ4cpyLZG0lMFVTTjVuhiVqeNSFdlI=", url: "https://www.freeslots.com/Slot3.htm", tipo: "Máquinas tragaperras"});
addPost({nombre: "Slot Machine", imagen: "https://media.istockphoto.com/id/817307644/vector/jackpot-slot-casino-machine-vector-one-arm-bandit.jpg?s=612x612&w=0&k=20&c=kX6YBt8SCFJCRYQ4cpyLZG0lMFVTTjVuhiVqeNSFdlI=", url: "https://www.freeslots.com/Slot3.htm", tipo: "Máquinas tragaperras"});
addPost({nombre: "Slot Machine", imagen: "https://media.istockphoto.com/id/817307644/vector/jackpot-slot-casino-machine-vector-one-arm-bandit.jpg?s=612x612&w=0&k=20&c=kX6YBt8SCFJCRYQ4cpyLZG0lMFVTTjVuhiVqeNSFdlI=", url: "https://www.freeslots.com/Slot3.htm", tipo: "Máquinas tragaperras"});

export function addPost(post) {
    ///En este apartado se comprueba que el post a crear existe o no, si no existe se le añade con el nuevo id. Pero, si existe se modifica dato a dato el post y se repostea con los nuevos datos///
    let tipo
    if (post.tipo === "Juegos de cartas"){
        tipo = 1;
    } else if (post.tipo === "Juegos de mesa"){
        tipo = 2; 
    } else if (post.tipo === "Máquinas tragaperras"){
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

export function getTragaperras() {
    let values = [...posts.get(3).values()];
    return values;
}