document.addEventListener('DOMContentLoaded', function() {
    initializeConversation();
});

function initializeConversation() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = parseInt(urlParams.get('userId'));

    if (!userId || isNaN(userId)) {
        alert('Usuario no válido');
        window.location.href = 'server.html';
        return;
    }

    loadUserInfo(userId);
    loadMessages(userId);
    setInterval(() => loadMessages(userId), 3000);
    setupMessageForm(userId);
}

async function loadUserInfo(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        document.getElementById('userName').textContent = user.userName;
    } catch (error) {
        console.error('Error al obtener información del usuario:', error);
    }
}

async function loadMessages(userId) {
    try {
        const response = await fetch(`/api/messages/${userId}`);
        const data = await response.json();
        
        const userMessages = document.getElementById('userMessages');
        const serverMessages = document.getElementById('serverMessages');
        
        userMessages.innerHTML = '';
        serverMessages.innerHTML = '';

        data.messages.forEach(message => {
            const isFromUser = message.sender_id === userId;
            const container = isFromUser ? userMessages : serverMessages;
            const time = new Date(message.created_at).toLocaleString();

            container.innerHTML += `
                <div class="message ${isFromUser ? 'received' : 'sent'}">
                    <div class="message-header">
                        ${isFromUser ? document.getElementById('userName').textContent : 'Servidor'}
                    </div>
                    <div class="message-content">
                        ${message.content}
                    </div>
                    <div class="message-time">
                        ${time}
                    </div>
                </div>
            `;
        });

        scrollToBottom(userMessages);
        scrollToBottom(serverMessages);
    } catch (error) {
        console.error('Error:', error);
    }
}

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

function setupMessageForm(userId) {
    document.getElementById('messageForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const content = document.getElementById('messageContent').value;

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    receiver_id: userId,
                    content: content,
                    sender_id: 1  // ID del servidor
                })
            });

            if (response.ok) {
                document.getElementById('messageContent').value = '';
                await loadMessages(userId);
            } else {
                const error = await response.json();
                alert(error.message || 'Error al enviar mensaje');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar mensaje');
        }
    });
} 