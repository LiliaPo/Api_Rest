document.addEventListener('DOMContentLoaded', async () => {
    const usersList = document.getElementById('usersList');

    // Cargar usuarios
    const loadUsers = async () => {
        const response = await fetch('/api/server/getAllUsers');
        const users = await response.json();
        
        usersList.innerHTML = users.map(user => `
            <tr id="user-${user.id}">
                <td>${user.id}</td>
                <td class="editable" data-field="userName">${user.userName}</td>
                <td class="editable" data-field="name">${user.name}</td>
                <td class="editable" data-field="first_surname">${user.first_surname}</td>
                <td class="editable" data-field="email">${user.email}</td>
                <td>
                    <button onclick="startEdit(${user.id})" class="edit-button">Editar</button>
                    <button onclick="saveEdit(${user.id})" class="save-button" style="display:none">Guardar</button>
                    <button onclick="deleteUser(${user.id})">Borrar</button>
                </td>
            </tr>
        `).join('');
    };

    // Editar
    window.startEdit = (userId) => {
        const row = document.getElementById(`user-${userId}`);
        row.querySelectorAll('.editable').forEach(cell => cell.contentEditable = true);
        row.querySelector('.edit-button').style.display = 'none';
        row.querySelector('.save-button').style.display = 'inline';
    };

    // Guardar
    window.saveEdit = async (userId) => {
        const row = document.getElementById(`user-${userId}`);
        const userData = {};
        row.querySelectorAll('.editable').forEach(cell => {
            userData[cell.dataset.field] = cell.textContent;
        });

        await fetch(`/api/server/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        row.querySelectorAll('.editable').forEach(cell => cell.contentEditable = false);
        row.querySelector('.edit-button').style.display = 'inline';
        row.querySelector('.save-button').style.display = 'none';
    };

    // Borrar
    window.deleteUser = async (userId) => {
        if (confirm('¿Seguro que quieres borrar este usuario?')) {
            await fetch(`/api/server/users/${userId}`, { method: 'DELETE' });
            await loadUsers();
        }
    };

    await loadUsers();
}); 