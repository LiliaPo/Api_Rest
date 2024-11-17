document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = '/';
});

const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const form = document.getElementById('registerForm');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const isValid = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password);
    
    if (!isValid) {
        passwordError.style.display = 'block';
        passwordInput.setCustomValidity('Contraseña inválida');
    } else {
        passwordError.style.display = 'none';
        passwordInput.setCustomValidity('');
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        const formData = {
            username: document.getElementById('username').value,
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/html/conversation.html';
            } else {
                alert(data.message || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al intentar registrar');
        }
    }
}); 