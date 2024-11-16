import { Request, Response, NextFunction } from 'express';

export function validateUserInput(req: Request, res: Response, next: NextFunction): void {
    const { username, name, surname, email, password } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!username || !name || !surname || !email || !password) {
        res.status(400).json({ 
            message: "Todos los campos son requeridos",
            required: ["username", "name", "surname", "email", "password"],
            received: req.body
        });
        return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ 
            message: "Formato de email inválido" 
        });
        return;
    }

    // Si todas las validaciones pasan, continuar
    next();
} 