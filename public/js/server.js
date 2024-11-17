document.addEventListener('DOMContentLoaded', async () => {
    const usersList = document.getElementById('usersList');

    document.getElementById('backBtn').addEventListener('click', () => {
        window.history.back();
    });

    try {
        console.log('Solicitando usuarios...');
        const response = await fetch('/api/server/getAllUsers');
        console.log('Respuesta recibida:', response);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const users = await response.json();
        console.log('Usuarios recibidos:', users);

        if (!users || users.length === 0) {
            usersList.innerHTML = '<tr><td colspan="5">No hay usuarios registrados</td></tr>';
            return;
        }

        usersList.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id || ''}</td>
                <td>${user.userName || ''}</td>
                <td>${user.name || ''}</td>
                <td>${user.lastname || ''}</td>
                <td>${user.email || ''}</td>
            `;
            usersList.appendChild(row);
        });
    } catch (error) {
        console.error('Error detallado:', error);
        usersList.innerHTML = `<tr><td colspan="5" class="error">Error al cargar usuarios: ${error.message}</td></tr>`;
    }
}); 