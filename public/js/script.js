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