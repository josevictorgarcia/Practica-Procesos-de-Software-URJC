// Función para alternar entre modos
function toggleTheme() {
    const body = document.body; // Referencia al body
    const boton = document.getElementById("botonClaro"); // Referencia al botón

  // Cambiar clase entre light-mode y dark-mode
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        boton.textContent = "Modo Claro"; // Texto del botón para volver al modo claro
        localStorage.setItem("theme", "dark"); // Guardar preferencia
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        boton.textContent = "Modo Oscuro"; // Texto del botón para volver al modo oscuro
        localStorage.setItem("theme", "light"); // Guardar preferencia
    }
}

// Función para aplicar el tema guardado al cargar la página
function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme"); // Recuperar preferencia
    const body = document.body;
    const boton = document.getElementById("botonClaro");

  // Aplicar el tema guardado, o usar light-mode por defecto
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        boton.textContent = "Modo Claro"; // Botón cambiará al modo claro
    } else {
        body.classList.add("light-mode");
        boton.textContent = "Modo Oscuro"; // Botón cambiará al modo oscuro
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", applySavedTheme);
