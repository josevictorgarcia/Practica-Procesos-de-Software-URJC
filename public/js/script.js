// Función para mostrar el botón "Ver Todos" si es necesario
function updateVerTodosButtonVisibility(section) {
    const gamesRow = section.querySelector('.games-row');
    const gameCards = gamesRow.querySelectorAll('.game-card');
    
    // Calcular el ancho total de todos los game-cards
    let totalWidth = 0;
    gameCards.forEach(card => {
        totalWidth += card.offsetWidth; // Ancho de cada tarjeta
    });

    // Comparar el ancho total con el ancho visible de gamesRow
    const visibleWidth = gamesRow.clientWidth;

    // Mostrar el botón "Ver Todos" si el ancho total excede el ancho visible
    const verTodosButton = section.querySelector('.ver-todos');
    // Verificar si se debe mostrar el botón
    if (totalWidth > visibleWidth || verTodosButton.textContent === 'Ocultar Todo') {
        verTodosButton.style.display = 'inline-block'; // Mostrar el botón
    } else {
        verTodosButton.style.display = 'none'; // Ocultar el botón si hay espacio suficiente
    }
}

// Inicializar la visibilidad del botón al cargar la página
document.querySelectorAll('section').forEach(section => {
    updateVerTodosButtonVisibility(section);
});

// Manejo del botón "Ver Todos"
const verTodosButtons = document.querySelectorAll('.ver-todos');
verTodosButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const gamesRow = event.target.closest('section').querySelector('.games-row');

        // Cambia la clase para activar el grid o flex
        gamesRow.classList.toggle('grid'); // Alterna entre flex y grid

        // Cambia el texto del botón
        if (gamesRow.classList.contains('grid')) {
            event.target.textContent = 'Ocultar Todo'; // Cambia a "Ocultar Todo"
        } else {
            event.target.textContent = 'Ver Todos'; // Restaura a "Ver Todos"
        }

        // Cambia la clase de todos los elementos .game-card
        const gameCards = gamesRow.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            if (gamesRow.classList.contains('grid')) {
                card.className = 'game-card'; // Establece solo la clase "game-card" en modo grid
            } else {
                card.className += ' col-6 col-lg-3'; // Restaura las clases originales en modo flex
            }
        });
        
        // Actualiza la visibilidad del botón "Ver Todos" después de alternar
        updateVerTodosButtonVisibility(event.target.closest('section'));
    });
});

// Manejar el cambio de tamaño de la ventana para actualizar el botón
window.addEventListener('resize', () => {
    document.querySelectorAll('section').forEach(section => {
        updateVerTodosButtonVisibility(section);
    });
});

// Manejo de flechas de desplazamiento
const arrows = document.querySelectorAll('.arrow');

arrows.forEach(arrow => {
    arrow.addEventListener('click', function() {
        const gamesRow = this.parentElement;
        const scrollAmount = 200; // Cambia este valor para ajustar la cantidad de desplazamiento
        if (this.classList.contains('arrow-left')) {
            gamesRow.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            gamesRow.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });
});

// Mostrar u ocultar flechas según el desplazamiento
document.querySelectorAll('.games-row').forEach(gamesRow => {
    gamesRow.addEventListener('scroll', () => {
        const scrollWidth = gamesRow.scrollWidth;
        const clientWidth = gamesRow.clientWidth;
        const scrollLeft = gamesRow.scrollLeft;

        const leftArrow = gamesRow.querySelector('.arrow-left');
        const rightArrow = gamesRow.querySelector('.arrow-right');

        // Mostrar u ocultar flechas
        leftArrow.style.display = scrollLeft > 0 ? 'block' : 'none';
        rightArrow.style.display = scrollLeft < scrollWidth - clientWidth ? 'block' : 'none';
    });

    // Triggers the scroll event on page load to set initial visibility of arrows
    gamesRow.dispatchEvent(new Event('scroll'));
});