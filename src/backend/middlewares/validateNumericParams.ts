
import Express from 'express';

export function validateNumericParams(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    next();
};