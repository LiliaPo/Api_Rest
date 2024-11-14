import { Request, Response, NextFunction } from 'express';

export function validateMessage(req: Request, res: Response, next: NextFunction): void {
    const { receiver_id, content } = req.body;

    // Validar que existan los campos requeridos
    if (!receiver_id || !content) {
        res.status(400).json({ 
            message: "Se requiere un destinatario y contenido para el mensaje" 
        });
        return;
    }

    // Validar que el receiver_id sea un número
    if (isNaN(Number(receiver_id))) {
        res.status(400).json({ 
            message: "El ID del destinatario debe ser un número" 
        });
        return;
    }

    // Validar el contenido del mensaje
    if (typeof content !== 'string') {
        res.status(400).json({ 
            message: "El contenido del mensaje debe ser texto" 
        });
        return;
    }

    // Sanitizar el contenido (ejemplo básico)
    req.body.content = content.trim();

    next();
} 