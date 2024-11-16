import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode?: number;
}

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(statusCode).json({
        status: 'error',
        message: message
    });
}

export function notFound(req: Request, res: Response, next: NextFunction) {
    const error = new Error(`Ruta no encontrada - ${req.originalUrl}`) as CustomError;
    error.statusCode = 404;
    next(error);
}
