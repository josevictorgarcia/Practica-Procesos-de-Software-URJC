// Función para alternar entre modos
function toggleTheme() {
    const body = document.body; // Referencia al body
    const boton = document.getElementById("botonClaro"); // Referencia al botón
    const pageTop = document.getElementById("pageTop");
    const logoContainer = document.getElementById("logoContainer");
    const userProfile = document.querySelector(".userProfile"); // Selección del contenedor de perfil

    // Botones del navbar por su ID único
    const buttonInicio = document.getElementById("buttonInicio");
    const buttonReglas = document.getElementById("buttonReglas");
    const buttonSobreNosotros = document.getElementById("buttonSobreNosotros");
    const buttonNuevoJuego = document.getElementById("buttonNuevoJuego");

    // Cambiar clase entre light-mode y dark-mode
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        boton.textContent = "Modo Claro"; // Texto del botón para volver al modo claro
        localStorage.setItem("theme", "dark"); // Guardar preferencia

        // Estilo para el modo oscuro
        pageTop.style.backgroundImage =
            "url('https://static.vecteezy.com/system/resources/previews/002/582/112/original/seamless-abstract-casino-pattern-with-playing-cards-signs-grey-symbols-on-black-background-casino-symbols-vector.jpg')";
        logoContainer.style.border = "4px solid #000";
        userProfile.classList.replace("light-mode", "dark-mode"); // Actualizar clase del perfil

        // Actualizar clases de los botones del navbar
        buttonInicio.classList.remove("light-mode");
        buttonInicio.classList.add("dark-mode");
        buttonReglas.classList.remove("light-mode");
        buttonReglas.classList.add("dark-mode");
        buttonSobreNosotros.classList.remove("light-mode");
        buttonSobreNosotros.classList.add("dark-mode");
        buttonNuevoJuego.classList.remove("light-mode");
        buttonNuevoJuego.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        boton.textContent = "Modo Oscuro"; // Texto del botón para volver al modo oscuro
        localStorage.setItem("theme", "light"); // Guardar preferencia

        // Estilo para el modo claro
        pageTop.style.backgroundImage =
            "url('https://static.vecteezy.com/system/resources/previews/013/279/683/non_2x/seamless-pattern-of-retro-old-hipster-video-game-consoles-texture-from-the-70s-80s-90s-2000s-on-a-blue-background-vector.jpg')";
        logoContainer.style.border = "4px solid #781010";
        userProfile.classList.replace("dark-mode", "light-mode"); // Actualizar clase del perfil

        // Actualizar clases de los botones del navbar
        buttonInicio.classList.remove("dark-mode");
        buttonInicio.classList.add("light-mode");
        buttonReglas.classList.remove("dark-mode");
        buttonReglas.classList.add("light-mode");
        buttonSobreNosotros.classList.remove("dark-mode");
        buttonSobreNosotros.classList.add("light-mode");
        buttonNuevoJuego.classList.remove("dark-mode");
        buttonNuevoJuego.classList.add("light-mode");
    }
}

// Función para aplicar el tema guardado al cargar la página
function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme"); // Recuperar preferencia
    const body = document.body;
    const boton = document.getElementById("botonClaro");
    const userProfile = document.querySelector(".userProfile"); // Selección del contenedor de perfil
    const pageTop = document.getElementById("pageTop");
    const logoContainer = document.getElementById("logoContainer");
    const buttonInicio = document.getElementById("buttonInicio");
    const buttonReglas = document.getElementById("buttonReglas");
    const buttonSobreNosotros = document.getElementById("buttonSobreNosotros");
    const buttonNuevoJuego = document.getElementById("buttonNuevoJuego");

    body.classList.remove("light-mode");
    userProfile.classList.remove("light-mode");
    pageTop.classList.remove("light-mode");
    logoContainer.classList.remove("light-mode");
    buttonInicio.classList.remove("light-mode");
    buttonReglas.classList.remove("light-mode");
    buttonSobreNosotros.classList.remove("light-mode");
    buttonNuevoJuego.classList.remove("light-mode");


    // Aplicar el tema guardado, o usar light-mode por defecto
    if (savedTheme === "dark") {
        body.classList.remove("light-mode");
        userProfile.classList.remove("light-mode");
        pageTop.classList.remove("light-mode");
        logoContainer.classList.remove("light-mode");
        buttonInicio.classList.remove("light-mode");
        buttonReglas.classList.remove("light-mode");
        buttonSobreNosotros.classList.remove("light-mode");
        buttonNuevoJuego.classList.remove("light-mode");

        body.classList.add("dark-mode");
        userProfile.classList.add("dark-mode");
        pageTop.classList.add("dark-mode");
        logoContainer.classList.add("dark-mode");
        buttonInicio.classList.add("dark-mode");
        buttonReglas.classList.add("dark-mode");
        buttonSobreNosotros.classList.add("dark-mode");
        buttonNuevoJuego.classList.add("dark-mode");

        boton.textContent = "Modo Claro"; // Botón cambiará al modo claro
    } else {
        body.classList.remove("dark-mode");
        userProfile.classList.remove("dark-mode");
        pageTop.classList.remove("dark-mode");
        logoContainer.classList.remove("dark-mode");
        buttonInicio.classList.remove("dark-mode");
        buttonReglas.classList.remove("dark-mode");
        buttonSobreNosotros.classList.remove("dark-mode");
        buttonNuevoJuego.classList.remove("dark-mode");

        body.classList.add("light-mode");
        userProfile.classList.add("light-mode");
        pageTop.classList.add("light-mode");
        logoContainer.classList.add("light-mode");
        buttonInicio.classList.add("light-mode");
        buttonReglas.classList.add("light-mode");
        buttonSobreNosotros.classList.add("light-mode");
        buttonNuevoJuego.classList.add("light-mode");

        boton.textContent = "Modo Oscuro"; // Botón cambiará al modo oscuro
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", applySavedTheme);