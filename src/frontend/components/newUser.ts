import { setupPasswordToggle } from './utils/passwordUtils';

interface UserData {
    userName: string;
    name: string;
    first_surname: string;
    email: string;
    password: string;
}

document.addEventListener('DOMContentLoaded', function() {
    initializeRegistration();
});

function initializeRegistration(): void {
    setupPasswordToggle('togglePassword', 'password');
    setupPasswordValidation();
    setupRegistrationForm();
}

function setupPasswordValidation(): void {
    const password = document.getElementById('password') as HTMLInputElement;
    const passwordHelp = document.getElementById('passwordHelp') as HTMLElement;
    
    if (!password || !passwordHelp) return;
    
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

function setupRegistrationForm(): void {
    const form = document.getElementById('registerForm') as HTMLFormElement;
    form.addEventListener('submit', handleRegistration);
}

async function handleRegistration(e: Event): Promise<void> {
    e.preventDefault();
    
    const userData: UserData = {
        userName: (document.getElementById('userName') as HTMLInputElement).value,
        name: (document.getElementById('name') as HTMLInputElement).value,
        first_surname: (document.getElementById('first_surname') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        password: (document.getElementById('password') as HTMLInputElement).value
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