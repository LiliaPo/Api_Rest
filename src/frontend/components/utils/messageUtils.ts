export interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at: string;
    read: boolean;
}

export function scrollToBottom(element: HTMLElement): void {
    element.scrollTop = element.scrollHeight;
}

export async function loadMessagesFromApi(userId: string): Promise<Message[]> {
    const response = await fetch(`/api/messages/${userId}`);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Error al cargar mensajes');
    }

    return data.messages;
}

export function displayMessages(messages: Message[], userId: number): void {
    const userMessages = document.getElementById('userMessages');
    const serverMessages = document.getElementById('serverMessages');
    
    if (!userMessages || !serverMessages) return;
    
    userMessages.innerHTML = '';
    serverMessages.innerHTML = '';

    messages.forEach(message => {
        const isFromUser = message.sender_id === userId;
        const container = isFromUser ? userMessages : serverMessages;
        const time = new Date(message.created_at).toLocaleString();

        container.innerHTML += `
            <div class="message ${isFromUser ? 'received' : 'sent'}">
                <div class="message-header">
                    ${isFromUser ? 'Usuario' : 'Servidor'}
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
} 