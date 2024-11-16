import { Request, Response, NextFunction } from 'express';

export function validateNotification(req: Request, res: Response, next: NextFunction): void {
    const { userId, message, type } = req.body;

    if (!userId || !message || !type) {
        res.status(400).json({ 
            message: "Se requieren userId, message y type para crear una notificación" 
        });
        return;
    }

    if (typeof userId !== 'number') {
        res.status(400).json({ 
            message: "userId debe ser un número" 
        });
        return;
    }

    if (typeof message !== 'string' || message.trim().length === 0) {
        res.status(400).json({ 
            message: "message debe ser un texto no vacío" 
        });
        return;
    }

    next();
} 