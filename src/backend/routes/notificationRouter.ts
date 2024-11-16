import Express from 'express';
import { Request, Response } from 'express';

const notificationRouter = Express.Router();

// GET /api/notifications - Obtener todas las notificaciones
notificationRouter.get('/', async (req: Request, res: Response) => {
    try {
        // Por ahora devolvemos un array vacío
        res.json([]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener notificaciones" });
    }
});

// POST /api/notifications - Crear una nueva notificación
notificationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { message, type } = req.body;
        // Por ahora solo devolvemos los datos recibidos
        res.status(201).json({ 
            message: "Notificación creada",
            data: { message, type, created_at: new Date() }
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear notificación" });
    }
});

export default notificationRouter;