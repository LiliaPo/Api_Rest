document.addEventListener('DOMContentLoaded', function() {
    initializeRegistration();
});

function initializeRegistration() {
    setupPasswordToggle();
    setupPasswordValidation();
    setupRegistrationForm();
}

function setupPasswordToggle() {
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');

    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
    });
}

function setupPasswordValidation() {
    const password = document.getElementById('password');
    const passwordHelp = document.getElementById('passwordHelp');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    password.addEventListener('input', function() {
        const isValid = passwordRegex.test(this.value);
        const requirements = {
            length: this.value.length >= 8,
            uppercase: /[A-Z]/.test(this.value),
            number: /\d/.test(this.value),
            special: /[@$!%*?&]/.test(this.value)
        };

        let message = '';
        if (!requirements.length) message += 'Mínimo 8 caracteres. ';
        if (!requirements.uppercase) message += 'Falta una mayúscula. ';
        if (!requirements.number) message += 'Falta un número. ';
        if (!requirements.special) message += 'Falta un carácter especial (@$!%*?&). ';

        passwordHelp.textContent = message;
        this.style.borderColor = isValid ? '#198754' : '#dc3545';
    });
}

function setupRegistrationForm() {
    document.getElementById('registerForm').addEventListener('submit', handleRegistration);
}

async function handleRegistration(e) {
    e.preventDefault();
    
    const userData = {
        userName: document.getElementById('userName').value,
        name: document.getElementById('name').value,
        first_surname: document.getElementById('first_surname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        
        if (response.ok) {
            alert('Usuario registrado correctamente');
            window.location.href = 'notifications.html';
        } else {
            alert(result.message || 'Error al registrar usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar usuario');
    }
} 