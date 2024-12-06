// src/managers/GameManager.js
import { executeNonQuery, executeQuery } from '../config/DatabaseConector.js';

class GameManager {
    constructor() {
        // No necesita una conexión a la base de datos, ya que utiliza las funciones exportadas
    }

    async addGame(nombre, descripcion, imagen, url, tipo) {
        try {
            // Usar executeNonQuery que maneja la inserción
            await executeNonQuery(
                "INSERT INTO juegos (nombre, descripcion, imagen, url, tipo) VALUES (?, ?, ?, ?, ?)",
                [nombre, descripcion, imagen, url, tipo]
            );
            console.log("Juego agregado correctamente.");
        } catch (err) {
            console.error("Error al agregar el juego:", err.message);
        }
    }

    async initializeGames() {
        const juegosIniciales = [
            { nombre: "Blackjack", imagen: "https://images.sigma.world/blackjack-card-counting-scaled-1.jpg", url: "https://www.minijuegos.com/embed/blackjack-master", tipo: "cartas", descripcion: "El Blackjack online es un emocionante juego de cartas en el que te enfrentas a la banca para alcanzar 21 puntos sin pasarte. Con reglas simples, combina estrategia y suerte mientras decides si pedir carta, plantarte o doblar tu apuesta. ¡Perfecto para desafiar tus habilidades y vivir la emoción de un casino desde cualquier lugar!" },
            { nombre: "Parchis", imagen: "https://www.mora-play.com/mora/wp-content/uploads/2023/02/ref.-66-001-scaled.jpg", url: "https://www.minijuegos.com/embed/ludo-hero", tipo: "mesa", descripcion: "El Parchís online es un divertido juego de mesa clásico en el que compites para llevar tus fichas a la meta antes que tus oponentes. Con reglas sencillas, lanzas el dado, avanzas estratégicamente y puedes capturar fichas rivales. ¡Ideal para disfrutar con amigos o desafiar a jugadores de todo el mundo!" },
            { nombre: "Ruleta", imagen: "https://www.rockaxis.com/img/newsList/8047148.png", url: "https://www.minijuegos.com/embed/grand-roulette", tipo: "mesa", descripcion: "La Ruleta de casino online es un emocionante juego de azar en el que apuestas al número, color o sección donde crees que caerá la bola giratoria. Con versiones clásicas como la europea y americana, es fácil de jugar y ofrece múltiples formas de ganar. ¡Siente la adrenalina en cada giro!" },
            { nombre: "Buble Shooter", imagen: "https://www4.minijuegosgratis.com/v3/games/thumbnails/220834_7_sq.jpg", url: "https://www.minijuegos.com/embed/bubble-shooter-hd", tipo: "accion", descripcion: "Bubble Shooter online es un divertido juego de habilidad en el que disparas burbujas de colores para formar grupos de tres o más del mismo color y hacerlas explotar. Pon a prueba tu puntería y estrategia mientras limpias el tablero antes de que las burbujas te alcancen. ¡Simple, adictivo y perfecto para todas las edades!" }
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
            console.log(name)
            const game = await executeQuery("SELECT * FROM juegos WHERE nombre = ?", [name]);
            if (game.length === 0) {
                return false
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