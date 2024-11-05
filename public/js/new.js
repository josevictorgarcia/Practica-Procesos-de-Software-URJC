async function enviarFormulario() {
    const form = document.getElementById('form-new-game');
    const formData = new FormData(form);

    // Convertir el FormData a un objeto JSON
    const data = Object.fromEntries(formData.entries());

    // Validaciones de los campos
    // Validar nombre: debe ser texto y no mayor a 50 caracteres
    if (typeof data.nombre !== 'string' || data.nombre.length > 50) {
        alert('El nombre debe ser un texto y no mayor a 50 caracteres.');
        return;
    }

    // Validar que imagen sea una URL que termine en ".png"
    const urlRegex = /^(https?:\/\/[^\s]+)$/;
    if (!urlRegex.test(data.imagen) || !data.imagen.endsWith('.png')) {
        alert('La imagen debe ser una URL válida que termine en ".png".');
        return;
    }

    // Validar que url sea una URL válida
    if (!urlRegex.test(data.url)) {
        alert('La URL de la página web debe ser una URL válida.');
        return;
    }

    // Validar que tipo sea uno de los valores permitidos y ajustar el valor de "acción" si corresponde
    const allowedTypes = ['cartas', 'mesa', 'accion'];
    data.tipo = data.tipo.replace('Juegos de ', '').toLowerCase();
    if (data.tipo === 'acción') {
        data.tipo = 'accion';
    }
    if (!allowedTypes.includes(data.tipo)) {
        alert('El tipo debe ser uno de los siguientes: cartas, mesa, o accion.');
        return;
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