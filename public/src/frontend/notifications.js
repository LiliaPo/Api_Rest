document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initializeNotifications();
});

function checkAuthentication() {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (!userId || !userName) {
        window.location.href = 'login.html';
    }
}

function initializeNotifications() {
    loadMessages();
    setInterval(loadMessages, 3000);
    setupMessageForm();
}

async function loadMessages() {
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/messages/${userId}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error al cargar mensajes');
        }

        displayMessages(data.messages);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMessages(messages) {
    const serverMessages = document.getElementById('serverMessages');
    const myMessages = document.getElementById('myMessages');
    const userId = localStorage.getItem('userId');
    
    serverMessages.innerHTML = '';
    myMessages.innerHTML = '';

    messages.forEach(message => {
        const isFromServer = message.sender_id === 1;
        const container = isFromServer ? serverMessages : myMessages;
        const time = new Date(message.created_at).toLocaleString();

        container.innerHTML += `
            <div class="message ${isFromServer ? 'received' : 'sent'}">
                <div class="message-header">
                    ${isFromServer ? 'Servidor' : 'Tú'}
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

    scrollToBottom(serverMessages);
    scrollToBottom(myMessages);
}

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

function setupMessageForm() {
    document.getElementById('messageForm').addEventListener('submit', handleMessageSubmit);
}

async function handleMessageSubmit(e) {
    e.preventDefault();
    const content = document.getElementById('messageContent').value;
    const userId = localStorage.getItem('userId');

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                receiver_id: 1, // ID del servidor
                content: content,
                sender_id: parseInt(userId)
            })
        });

        if (response.ok) {
            document.getElementById('messageContent').value = '';
            await loadMessages();
        } else {
            const error = await response.json();
            alert(error.message || 'Error al enviar mensaje');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar mensaje');
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
} 