// Función para alternar entre modos
function toggleTheme() {
  const body = document.body; // Referencia al body
  const boton = document.getElementById("botonClaro"); // Referencia al botón
  const pageTop = document.getElementById("pageTop");
  const logoContainer = document.getElementById("logoContainer");
  const usernickname = document.getElementById("usernickname");

  // Cambiar clase entre light-mode y dark-mode
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    boton.textContent = "Modo Claro"; // Texto del botón para volver al modo claro
    localStorage.setItem("theme", "dark"); // Guardar preferencia
    pageTop.style.backgroundImage =
      "url('https://static.vecteezy.com/system/resources/previews/002/582/112/original/seamless-abstract-casino-pattern-with-playing-cards-signs-grey-symbols-on-black-background-casino-symbols-vector.jpg')";
    logoContainer.style.border = "4px solid #000";
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    boton.textContent = "Modo Oscuro"; // Texto del botón para volver al modo oscuro
    localStorage.setItem("theme", "light"); // Guardar preferencia
    pageTop.style.backgroundImage =
      "url('https://static.vecteezy.com/system/resources/previews/013/279/683/non_2x/seamless-pattern-of-retro-old-hipster-video-game-consoles-texture-from-the-70s-80s-90s-2000s-on-a-blue-background-vector.jpg')";
    logoContainer.style.border = "4px solid #781010";
    usernickname.style.color = "black";
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
