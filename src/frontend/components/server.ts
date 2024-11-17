import { User, loadUsers, deleteUser, editUser, sendMessage } from './utils/userUtils';

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const users = await loadUsers();
        displayUsers(users);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar usuarios');
    }
});

function displayUsers(users: User[]): void {
    const usersList = document.getElementById('usersList');
    if (!usersList) return;

    usersList.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.userName}</td>
            <td>${user.name}</td>
            <td>${user.first_surname}</td>
            <td>${user.email}</td>
            <td>
                <div class="d-flex gap-1">
                    <button class="btn btn-warning btn-action" onclick="editUser(${user.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-action" onclick="handleDelete(${user.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-info btn-action" onclick="sendMessage(${user.id})">
                        <i class="bi bi-envelope"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function handleDelete(userId: number): Promise<void> {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        try {
            await deleteUser(userId);
            alert('Usuario eliminado correctamente');
            const users = await loadUsers();
            displayUsers(users);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar usuario');
        }
    }
}

// Exportar funciones para uso en HTML
(window as any).editUser = editUser;
(window as any).handleDelete = handleDelete;
(window as any).sendMessage = sendMessage; 