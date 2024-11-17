document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = '/';
        return;
    }

    const messagesList = document.getElementById('messagesList');
    const notificationsList = document.getElementById('notificationsList');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const backBtn = document.getElementById('backBtn');

    // Cargar mensajes y notificaciones
    const loadMessages = async () => {
        try {
            const response = await fetch(`/api/server/messages/${userId}`);
            const messages = await response.json();
            
            messagesList.innerHTML = messages.map(msg => `
                <div class="message ${msg.sender_id == userId ? 'sent' : 'received'}">
                    <strong>${msg.sender_name}</strong>
                    <p>${msg.content}</p>
                    <small>${new Date(msg.created_at).toLocaleString()}</small>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error al cargar mensajes:', error);
        }
    };

    const loadNotifications = async () => {
        try {
            const response = await fetch(`/api/server/notifications/${userId}`);
            const notifications = await response.json();
            
            notificationsList.innerHTML = notifications.map(notif => `
                <div class="notification ${notif.read ? 'read' : 'unread'}" data-id="${notif.id}">
                    <p>${notif.message}</p>
                    <small>${new Date(notif.created_at).toLocaleString()}</small>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error al cargar notificaciones:', error);
        }
    };

    // Enviar mensaje
    sendButton.addEventListener('click', async () => {
        const content = messageInput.value.trim();
        if (!content) return;

        try {
            await fetch('/api/server/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender_id: userId,
                    content
                })
            });

            messageInput.value = '';
            await loadMessages();
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
        }
    });

    // Marcar notificación como leída
    notificationsList.addEventListener('click', async (e) => {
        const notification = e.target.closest('.notification');
        if (notification && !notification.classList.contains('read')) {
            const id = notification.dataset.id;
            try {
                await fetch(`/api/server/notifications/${id}/read`, {
                    method: 'PUT'
                });
                await loadNotifications();
            } catch (error) {
                console.error('Error al marcar notificación:', error);
            }
        }
    });

    backBtn.addEventListener('click', () => {
        window.history.back();
    });

    // Cargar datos iniciales
    loadMessages();
    loadNotifications();

    // Actualizar cada 30 segundos
    setInterval(() => {
        loadMessages();
        loadNotifications();
    }, 30000);
}); 