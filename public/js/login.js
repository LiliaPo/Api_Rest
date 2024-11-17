document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const backBtn = document.getElementById('backBtn');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar datos del usuario
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('token', data.token);
                
                // Redirigir a la página de mensajería
                window.location.href = '/html/messaging.html';
            } else {
                alert(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al intentar iniciar sesión');
        }
    });

    backBtn.addEventListener('click', () => {
        window.location.href = '/';
    });
}); 