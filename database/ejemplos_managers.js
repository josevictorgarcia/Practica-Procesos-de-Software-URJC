// ___ EJEMPLO USO USERMANAGER ___
  // import UserManager from './managers/UserManager.js';

  // // Crear una instancia del gestor de usuarios
  // const userManager = new UserManager();

  // // Agregar un nuevo usuario
  // userManager.addUser('John Doe', 'john.doe@example.com', 'mypassword', 'https://example.com/profile.jpg')
  //   .then(result => console.log(result))
  //   .catch(error => console.error(error));

  // // Verificar las credenciales de un usuario
  // userManager.verifyUser('john.doe@example.com', 'mypassword')
  //   .then(result => console.log(result))
  //   .catch(error => console.error(error));

  // // Obtener la información de un usuario
  // userManager.getUserInfo('john.doe@example.com')
  //   .then(userInfo => console.log(userInfo))
  //   .catch(error => console.error(error));

// ___ EJEMPLO USO GAMEMANAGER ___
  // import GameManager from './managers/GameManager.js';

  // // Crear una instancia del gestor de juegos
  // const gameManager = new GameManager();

  // // Agregamos los juegos inicales
  // gameManager.initializeGames()s

    // // Agregar un nuevo juego
    // gameManager.addGame('The Legend of Zelda: Breath of the Wild', 'https://example.com/zelda.jpg', 'https://example.com/play/zelda', 'Juegos de aventura')
    //     .then(() => console.log('Juego agregado correctamente.'))
    //     .catch(error => console.error('Error al agregar juego:', error));

    // // Obtener todos los juegos
    // gameManager.getAllGames()
    //     .then(allGames => console.log('Todos los juegos:', allGames))
    //     .catch(error => console.error('Error al obtener todos los juegos:', error));

    // // Obtener juegos filtrados por tipo
    // gameManager.getAllGames('Juegos de aventura')
    //     .then(adventureGames => console.log('Juegos de aventura:', adventureGames))
    //     .catch(error => console.error('Error al obtener juegos de aventura:', error));

    // // Actualizar un juego (suponiendo que el juego con ID 1 existe)
    // gameManager.updateGame(1, {
    //     nombre: 'The Legend of Zelda: Tears of the Kingdom',
    //     imagen: 'https://example.com/zelda-tears.jpg',
    //     url: 'https://example.com/play/zelda-tears',
    //     tipo: 'Juegos de aventura'
    // })
    //     .then(() => console.log('Juego actualizado correctamente.'))
    //     .catch(error => console.error('Error al actualizar juego:', error));

    // // Eliminar un juego (suponiendo que el juego con ID 1 existe)
    // gameManager.deleteGame(1)
    //     .then(() => console.log('Juego eliminado correctamente.'))
    //     .catch(error => console.error('Error al eliminar juego:', error));