// src/managers/GameManager.js
import { executeNonQuery, executeQuery } from '../config/DatabaseConector.js';

class GameManager {
    constructor() {
        // No necesita una conexión a la base de datos, ya que utiliza las funciones exportadas
    }

    async addGame(nombre, imagen, url, tipo) {
        try {
            // Usar executeNonQuery que maneja la inserción
            await executeNonQuery(
                "INSERT INTO juegos (nombre, imagen, url, tipo) VALUES (?, ?, ?, ?)",
                [nombre, imagen, url, tipo]
            );
            console.log("Juego agregado correctamente.");
        } catch (err) {
            console.error("Error al agregar el juego:", err.message);
        }
    }

    async initializeGames() {
        const juegosIniciales = [
            { nombre: "Blackjack", imagen: "https://images.sigma.world/blackjack-card-counting-scaled-1.jpg", url: "https://www.gamepix.com/play/las-vegas-blackjack", tipo: "cartas" },
            { nombre: "Parchis", imagen: "https://www.mora-play.com/mora/wp-content/uploads/2023/02/ref.-66-001-scaled.jpg", url: "https://www.ludoteka.com/juegos/parchis/parchis-individual-a-4", tipo: "mesa" },
            { nombre: "Ruleta", imagen: "https://www.rockaxis.com/img/newsList/8047148.png", url: "https://es.piliapp.com/random/wheel/", tipo: "mesa" },
            { nombre: "Juego Shooter", imagen: "https://images.crazygames.com/games/krunker-io/cover-1591336739727.png?auto=format,compress&q=75&cs=strip", url: "https://krunker.io", tipo: "accion" }
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

    async getAllGames(tipo) {
        try {
            // Construir la consulta SQL base
            let query = "SELECT * FROM juegos";
            const params = [];

            // Si se proporciona el tipo, modificar la consulta
            if (tipo) {
                query += " WHERE tipo = ?";
                params.push(tipo);
            }

            const games = await executeQuery(query, params);
            return games;
        } catch (err) {
            console.error("Error al obtener los juegos:", err.message);
            throw err;
        }
    }

    async getGameByName(name) {
        try {
            const game = await executeQuery("SELECT * FROM juegos WHERE nombre = ?", [name]);
            if (game.length === 0) {
                throw new Error("Juego no encontrado.");
            }
            return game[0];
        } catch (err) {
            console.error("Error al obtener el juego:", err.message);
            throw err;
        }
    }

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
            await executeNonQuery(query, values);

            console.log("Juego actualizado correctamente.");
        } catch (err) {
            console.error("Error al actualizar el juego:", err.message);
            throw err;
        }
    }

    async deleteGame(id) {
        try {
            await executeNonQuery("DELETE FROM juegos WHERE id = ?", [id]);
            console.log("Juego eliminado correctamente.");
        } catch (err) {
            console.error("Error al eliminar el juego:", err.message);
            throw err;
        }
    }
}

export default GameManager;