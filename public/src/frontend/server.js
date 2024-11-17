document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        
        const usersList = document.getElementById('usersList');
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
                        <button class="btn btn-danger btn-action" onclick="deleteUser(${user.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                        <button class="btn btn-info btn-action" onclick="sendMessage(${user.id})">
                            <i class="bi bi-envelope"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar usuarios');
    }
}

async function deleteUser(userId) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Usuario eliminado correctamente');
                loadUsers();
            } else {
                const error = await response.json();
                alert(error.message || 'Error al eliminar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar usuario');
        }
    }
}

function editUser(userId) {
    // Por implementar
    alert('Función de editar en desarrollo');
}

function sendMessage(userId) {
    window.location.href = `conversation.html?userId=${userId}`;
} 