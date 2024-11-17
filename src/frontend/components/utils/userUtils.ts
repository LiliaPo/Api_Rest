export interface User {
    id: number;
    userName: string;
    name: string;
    first_surname: string;
    email: string;
}

export async function loadUsers(): Promise<User[]> {
    const response = await fetch('/api/users');
    return await response.json();
}

export async function deleteUser(userId: number): Promise<void> {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar usuario');
    }
}

export function editUser(userId: number): void {
    alert('Función de editar en desarrollo');
}

export function sendMessage(userId: number): void {
    window.location.href = `conversation.html?userId=${userId}`;
} 