// src/managers/GameManager.js

/**
 * Clase GameManager
 * 
 * La clase `GameManager` proporciona métodos para gestionar los registros en la tabla `juegos`
 * de la base de datos, permitiendo agregar, actualizar, obtener y eliminar juegos.
 * 
 * Métodos:
 * - `constructor(dbConnection)`: Inicializa el gestor de juegos con una conexión de base de datos.
 * - `addGame(titulo, descripcion, tipo)`: Agrega un nuevo juego a la base de datos.
 * - `getGameById(id)`: Obtiene la información de un juego específico por su ID.
 * - `getAllGames()`: Obtiene todos los juegos almacenados en la base de datos.
 * - `updateGame(id, newDetails)`: Actualiza la información de un juego por su ID.
 * - `deleteGame(id)`: Elimina un juego de la base de datos por su ID.
 * - `initializeGames()`: Carga los juegos iniciales en la base de datos.
 */

class GameManager {
    /**
     * Constructor de la clase GameManager.
     * 
     * Recibe una instancia de conexión de base de datos y la utiliza para ejecutar consultas
     * relacionadas con la administración de juegos.
     *
     * @param {DatabaseConnection} dbConnection - Instancia de conexión a la base de datos.
     */
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    /**
     * Agrega un nuevo juego a la base de datos utilizando una consulta SQL construida manualmente.
     *
     * @param {string} nombre - El título del juego.
     * @param {string} imagen - La URL de la imagen del juego.
     * @param {string} url - La URL del juego.
     * @param {string} tipo - El género del juego.
     * 
     * @returns {Promise<void>} Una promesa que se resuelve cuando el juego se ha insertado correctamente.
     */
    async addGame(nombre, imagen, url, tipo) {
        try {
            // Usar runQuery que ya debería manejar la parametrización de consultas
            await this.dbConnection.runQuery(
                "INSERT INTO juegos (nombre, imagen, url, tipo) VALUES (?, ?, ?, ?)",
                [nombre, imagen, url, tipo]
            );
            console.log("Juego agregado correctamente.");
        } catch (err) {
            console.error("Error al agregar el juego:", err.message);
        }
    }

    /**
     * Inicializa la base de datos con juegos predeterminados.
     *
     * Carga una lista de juegos en la base de datos si está vacía.
     *
     * @returns {Promise<void>} Una promesa que se resuelve cuando todos los juegos se han agregado correctamente.
     */
    async initializeGames() {
        const juegosIniciales = [
            { nombre: "Blackjack", imagen: "https://images.sigma.world/blackjack-card-counting-scaled-1.jpg", url: "https://www.gamepix.com/play/las-vegas-blackjack", tipo: "Juegos de cartas" },
            { nombre: "Parchis", imagen: "https://www.mora-play.com/mora/wp-content/uploads/2023/02/ref.-66-001-scaled.jpg", url: "https://www.ludoteka.com/juegos/parchis/parchis-individual-a-4", tipo: "Juegos de mesa" },
            { nombre: "Ruleta", imagen: "https://www.rockaxis.com/img/newsList/8047148.png", url: "https://es.piliapp.com/random/wheel/", tipo: "Juegos de mesa" },
            { nombre: "Juego Shooter", imagen: "https://images.crazygames.com/games/krunker-io/cover-1591336739727.png?auto=format,compress&q=75&cs=strip", url: "https://krunker.io", tipo: "Juegos de acción" }
        ];

        try {
            // Verifica si la tabla está vacía
            const games = await this.getAllGames();
            if (games.length === 0) {
                // Agrega los juegos iniciales
                for (const juego of juegosIniciales) {
                    await this.addGame(juego.nombre, juego.imagen, juego.url, juego.tipo);
                }
                console.log("Juegos iniciales cargados correctamente.");
            } else {
                console.log("Los juegos ya han sido cargados.");
            }
        } catch (err) {
            console.error("Error al inicializar juegos:", err.message);
        }
    }

    /**
     * Obtiene la información de un juego específico por su ID.
     *
     * @param {number} id - El ID del juego a buscar.
     * 
     * @returns {Promise<Object>} Una promesa que se resuelve con un objeto que contiene la información del juego.
     * 
     * @throws {Error} Si no se encuentra el juego con el ID proporcionado.
     */
    async getGameById(id) {
        try {
            const game = await this.dbConnection.runQuery("SELECT * FROM juegos WHERE id = ?", [id]);
            if (game.length === 0) {
                throw new Error("Juego no encontrado");
            }
            return game[0];
        } catch (err) {
            console.error("Error al obtener el juego:", err.message);
            throw err;
        }
    }

    /**
     * Obtiene todos los juegos almacenados en la base de datos.
     *
     * @returns {Promise<Array>} Una promesa que se resuelve con un arreglo de objetos, cada uno representando un juego.
     */
    async getAllGames() {
        try {
            const games = await this.dbConnection.runQuery("SELECT * FROM juegos");
            return games;
        } catch (err) {
            console.error("Error al obtener los juegos:", err.message);
            throw err;
        }
    }

    /**
     * Actualiza la información de un juego en la base de datos.
     *
     * @param {number} id - El ID del juego a actualizar.
     * @param {Object} newDetails - Un objeto que contiene los nuevos detalles del juego.
     *                               Puede incluir `nombre`, `descripcion`, y/o `tipo`.
     * 
     * @returns {Promise<void>} Una promesa que se resuelve cuando el juego ha sido actualizado correctamente.
     * 
     * @throws {Error} Si no se encuentra el juego con el ID proporcionado.
     */
    async updateGame(id, newDetails) {
        try {
            const { nombre, imagen, url, tipo } = newDetails;
            const fields = [];
            const values = [];

            if (nombre) {
                fields.push("nombre = ?");
                values.push(nombre);
            }
            if (imagen) {
                fields.push("imagen = ?");
                values.push(imagen);
            }
            if (url) {
                fields.push("url = ?");
                values.push(url);
            }
            if (tipo) {
                fields.push("tipo = ?");
                values.push(tipo);
            }

            values.push(id);

            const query = `UPDATE juegos SET ${fields.join(", ")} WHERE id = ?`;
            const result = await this.dbConnection.runQuery(query, values);

            if (result.changes === 0) {
                throw new Error("Juego no encontrado");
            }

            console.log("Juego actualizado correctamente.");
        } catch (err) {
            console.error("Error al actualizar el juego:", err.message);
            throw err;
        }
    }

    /**
     * Elimina un juego de la base de datos por su ID.
     *
     * @param {number} id - El ID del juego a eliminar.
     * 
     * @returns {Promise<void>} Una promesa que se resuelve cuando el juego ha sido eliminado correctamente.
     * 
     * @throws {Error} Si no se encuentra el juego con el ID proporcionado.
     */
    async deleteGame(id) {
        try {
            const result = await this.dbConnection.runQuery("DELETE FROM juegos WHERE id = ?", [id]);
            if (result.changes === 0) {
                throw new Error("Juego no encontrado");
            }
            console.log("Juego eliminado correctamente.");
        } catch (err) {
            console.error("Error al eliminar el juego:", err.message);
            throw err;
        }
    }
}

export default GameManager;
