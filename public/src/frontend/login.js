document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
});

function initializeLogin() {
    setupFormFields();
    setupPasswordToggle();
    setupLoginForm();
}

function setupFormFields() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    email.value = '';
    password.value = '';
    
    email.setAttribute('autocomplete', 'off');
    password.setAttribute('autocomplete', 'new-password');
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

function setupLoginForm() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

async function handleLogin(e) {
    e.preventDefault();
    
    const loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            saveUserData(result.user);
            redirectToNotifications();
        } else {
            alert(result.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    }
}

function saveUserData(user) {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('userRole', 'user');
}

function redirectToNotifications() {
    window.location.href = 'notifications.html';
} 