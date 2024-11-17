document.addEventListener('DOMContentLoaded', async () => {
    const messagesList = document.getElementById('messagesList');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const backBtn = document.getElementById('backBtn');

    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = '/';
        return;
    }

    // Enviar mensaje
    sendButton.addEventListener('click', async () => {
        const content = messageInput.value.trim();
        if (!content) return;

        try {
            // Primero añadir el mensaje al área superior
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message sent';
            messageDiv.innerHTML = `
                <p>${content}</p>
                <small>${new Date().toLocaleString()}</small>
            `;
            messagesList.appendChild(messageDiv);
            messagesList.scrollTop = messagesList.scrollHeight;

            // Luego guardar en la base de datos
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender_id: userId,
                    receiver_id: 1,
                    content
                })
            });

            if (response.ok) {
                // Limpiar el input solo si se guardó correctamente
                messageInput.value = '';
            }
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
        }
    });

    // Enviar con Enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendButton.click();
        }
    });

    backBtn.addEventListener('click', () => {
        window.history.back();
    });
}); 