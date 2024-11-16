import { Request, Response, NextFunction } from 'express';

export function validateUserInput(req: Request, res: Response, next: NextFunction): void {
    const { userName, name, first_surname, email, password } = req.body;

    // Verificar que todos los campos estén presentes
    if (!userName || !name || !first_surname || !email || !password) {
        res.status(400).json({ 
            message: "Todos los campos son requeridos" 
        });
        return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ 
            message: "Formato de email inválido" 
        });
        return;
    }

    // Validar contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ 
            message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial" 
        });
        return;
    }

    next();
} 