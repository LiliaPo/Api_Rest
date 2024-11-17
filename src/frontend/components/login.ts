import { setupPasswordToggle } from './utils/passwordUtils';

interface LoginData {
    email: string;
    password: string;
}

interface UserResponse {
    id: number;
    userName: string;
    email: string;
}

document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
});

function initializeLogin(): void {
    setupFormFields();
    setupPasswordToggle('togglePassword', 'password');
    setupLoginForm();
}

function setupFormFields(): void {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    
    if (!email || !password) return;
    
    email.value = '';
    password.value = '';
    
    email.setAttribute('autocomplete', 'off');
    password.setAttribute('autocomplete', 'new-password');
}

function setupLoginForm(): void {
    const form = document.getElementById('loginForm') as HTMLFormElement;
    if (!form) return;
    form.addEventListener('submit', handleLogin);
}

async function handleLogin(e: Event): Promise<void> {
    e.preventDefault();
    
    const loginData: LoginData = {
        email: (document.getElementById('email') as HTMLInputElement).value,
        password: (document.getElementById('password') as HTMLInputElement).value
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

function saveUserData(user: UserResponse): void {
    localStorage.setItem('userId', user.id.toString());
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('userRole', 'user');
}

function redirectToNotifications(): void {
    window.location.href = 'notifications.html';
} 