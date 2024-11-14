import { Request, Response, NextFunction } from 'express';

export function validateUserInput(req: Request, res: Response, next: NextFunction): void {
    const requiredFields = ['username', 'name', 'surname', 'email', 'password'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).json({ 
                message: `El campo ${field} es requerido` 
            });
            return;
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!req.body.email) {
        res.status(400).json({ 
            message: "El email es requerido" 
        });
        return;
    }
    
    if (!emailRegex.test(req.body.email)) {
        res.status(400).json({ 
            message: "El formato del email no es válido" 
        });
        return;
    }

    next();
} 