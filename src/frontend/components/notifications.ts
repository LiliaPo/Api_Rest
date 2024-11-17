import { sign } from 'crypto';
import { Message, scrollToBottom, loadMessagesFromApi } from './utils/messageUtils';

document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initializeNotifications();
});

function checkAuthentication(): void {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (!userId || !userName) {
        window.location.href = 'login.html';
    }
}

function initializeNotifications(): void {
    refreshMessages();
    setInterval(refreshMessages, 3000);
    setupMessageForm();
}

async function refreshMessages(): Promise<void> {sign
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const messages = await loadMessagesFromApi(userId);
        displayMessages(messages);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMessages(messages: Message[]): void {
    const serverMessages = document.getElementById('serverMessages');
    const myMessages = document.getElementById('myMessages');
    const userId = localStorage.getItem('userId');
    
    if (!serverMessages || !myMessages || !userId) return;
    
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

async function handleMessageSubmit(e: Event): Promise<void> {
    e.preventDefault();
    const messageInput = document.getElementById('messageContent') as HTMLTextAreaElement;
    const userId = localStorage.getItem('userId');

    if (!messageInput || !userId) return;

    const content = messageInput.value;

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
            messageInput.value = '';
            await refreshMessages();
        } else {
            const error = await response.json();
            alert(error.message || 'Error al enviar mensaje');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar mensaje');
    }
}

function setupMessageForm(): void {
    const form = document.getElementById('messageForm') as HTMLFormElement;
    if (!form) return;
    form.addEventListener('submit', handleMessageSubmit);
}

function logout(): void {
    localStorage.clear();
    window.location.href = 'login.html';
}

interface Notification {
    id: number;
    message: string;
    created_at: string;
    read: boolean;
    userName: string;
}

export class NotificationComponent {
    private container: HTMLElement;
    private userId: number;

    constructor(containerId: string, userId: number) {
        this.container = document.getElementById(containerId) as HTMLElement;
        this.userId = userId;
        this.init();
    }

    private async init() {
        await this.loadNotifications();
        this.setupEventListeners();
    }

    private async loadNotifications() {
        try {
            const response = await fetch(`/api/server/notifications/${this.userId}`);
            if (!response.ok) throw new Error('Error al cargar notificaciones');

            const notifications: Notification[] = await response.json();
            this.renderNotifications(notifications);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    private renderNotifications(notifications: Notification[]) {
        this.container.innerHTML = notifications.map(notification => `
            <div class="notification ${notification.read ? 'read' : 'unread'}" data-id="${notification.id}">
                <p>${notification.message}</p>
                <small>${new Date(notification.created_at).toLocaleString()}</small>
            </div>
        `).join('');
    }

    private setupEventListeners() {
        this.container.addEventListener('click', async (e) => {
            const target = e.target as HTMLElement;
            const notification = target.closest('.notification');
            if (notification && !notification.classList.contains('read')) {
                const id = notification.getAttribute('data-id');
                await this.markAsRead(parseInt(id!));
            }
        });
    }

    private async markAsRead(notificationId: number) {
        try {
            const response = await fetch(`/api/server/notifications/${notificationId}/read`, {
                method: 'PUT'
            });
            if (!response.ok) throw new Error('Error al marcar como leída');

            await this.loadNotifications();
        } catch (error) {
            console.error('Error:', error);
        }
    }
} 