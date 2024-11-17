// Manejar el botón volver
document.getElementById('backBtn').addEventListener('click', () => {
    window.history.back(); // Vuelve a la página anterior
});

// Manejar el envío de mensajes
document.getElementById('sendButton').addEventListener('click', async () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        try {
            // Enviar el mensaje al servidor
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ message })
            });

            if (response.ok) {
                // Limpiar el campo de mensaje
                messageInput.value = '';
                
                // Añadir el mensaje a la lista de mensajes enviados
                const messagesList = document.getElementById('sendMessages');
                const messageElement = document.createElement('div');
                messageElement.className = 'message sent';
                messageElement.textContent = message;
                messagesList.appendChild(messageElement);
            } else {
                alert('Error al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar el mensaje');
        }
    }
}); 