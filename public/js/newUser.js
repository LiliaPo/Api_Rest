document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const backBtn = document.getElementById('backBtn');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userData = {
            userName: document.getElementById('username').value,
            name: document.getElementById('name').value,
            first_surname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userId', data.user.id);
                window.location.href = '/html/messaging.html';
            } else {
                alert('Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar usuario');
        }
    });

    backBtn.addEventListener('click', () => {
        window.location.href = '/';
    });
}); 