export function setupPasswordToggle(toggleId: string, passwordId: string): void {
    const togglePassword = document.getElementById(toggleId) as HTMLElement;
    const password = document.getElementById(passwordId) as HTMLInputElement;

    if (!togglePassword || !password) return;

    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
    });
} 