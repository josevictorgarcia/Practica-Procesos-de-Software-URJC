async function enviarFormulario() {
    const form = document.getElementById('form-new-game');
    const formData = new FormData(form);

    // Convertir el FormData a un objeto JSON
    const data = Object.fromEntries(formData.entries());
    // Modificar el valor de "tipo" para quitar "Juegos de "
    if (data.tipo.startsWith("Juegos de ")) {
        data.tipo = data.tipo.replace("Juegos de ", "");
    }

    try {
        const response = await fetch('/newGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Juego agregado correctamente');
            // Redirige al usuario a la página principal
            window.location.href = '/';
        } else {
            const errorText = await response.text();
            alert('Error al agregar el juego: ' + errorText);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Error al enviar los datos: ' + error.message);
    }
}