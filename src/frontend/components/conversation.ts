import { Message, loadMessagesFromApi, displayMessages } from './utils/messageUtils';
import { User } from './utils/userUtils';

async function initializeConversation(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = parseInt(urlParams.get('userId') || '');

    if (!userId || isNaN(userId)) {
        alert('Usuario no válido');
        window.location.href = 'server.html';
        return;
    }

    await loadUserInfo(userId);
    await refreshMessages(userId);
    setInterval(() => refreshMessages(userId), 3000);
    setupMessageForm(userId);
}

async function loadUserInfo(userId: number): Promise<void> {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const user: User = await response.json();
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = user.userName;
        }
    } catch (error) {
        console.error('Error al obtener información del usuario:', error);
    }
}

async function refreshMessages(userId: number): Promise<void> {
    try {
        const messages = await loadMessagesFromApi(userId.toString());
        displayMessages(messages, userId);
    } catch (error) {
        console.error('Error:', error);
    }
}

function setupMessageForm(userId: number): void {
    const form = document.getElementById('messageForm') as HTMLFormElement;
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageInput = document.getElementById('messageContent') as HTMLTextAreaElement;
        if (!messageInput) return;

        const content = messageInput.value;

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
                messageInput.value = '';
                await refreshMessages(userId);
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

document.addEventListener('DOMContentLoaded', () => {
    initializeConversation();
}); 