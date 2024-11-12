class FormValidator {
    constructor(formId) {
        this.form = document.querySelector(`#${formId}`);
        this.errorMessages = new Map();
        this.initializeValidation();
    }
    initializeValidation() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        const inputs = this.form.querySelectorAll('input');
    }
    validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        switch (fieldName) {
            case 'username':
                return this.validateUsername(value);
            case 'name':
            case 'surname':
                return this.validateName(value, fieldName);
            case 'email':
                return this.validateEmail(value);
            case 'password':
                return this.validatePassword(value);
            default:
                return true;
        }
    }
    validateUsername(value) {
        if (value.length < 5) {
            this.showError('username', 'El nombre de usuario debe tener al menos 5 caracteres');
            return false;
        }
        this.removeError('username');
        return true;
    }
    validateName(value, fieldName) {
        if (value.length < 1) {
            this.showError(fieldName, `El ${fieldName === 'name' ? 'nombre' : 'apellido'} no puede estar vacío`);
            return false;
        }
        this.removeError(fieldName);
        return true;
    }
    validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            this.showError('email', 'Email inválido');
            return false;
        }
        this.removeError('email');
        return true;
    }
    validatePassword(value) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[|@#$%&])[A-Za-z\d|@#$%&]{8,}$/;
        if (!passwordRegex.test(value)) {
            this.showError('password', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (|@#$%&)');
            return false;
        }
        this.removeError('password');
        return true;
    }
    showError(fieldName, message) {
        var _a, _b;
        const input = this.form.querySelector(`#${fieldName}-field`);
        let errorDiv = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        input.classList.add('error');
        this.errorMessages.set(fieldName, message);
    }
    removeError(fieldName) {
        var _a;
        const input = this.form.querySelector(`#${fieldName}-field`);
        const errorDiv = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
        this.errorMessages.delete(fieldName);
    }
    handleSubmit(e) {
        e.preventDefault();
        const inputs = this.form.querySelectorAll('input');
        let isValid = true;
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        if (isValid) {
            this.form.submit();
        }
    }
}
export default FormValidator;
