import { Request, Response } from 'express';
import * as notificationService from '../services/notificationService.js';

export async function sendNotification(req: Request, res: Response): Promise<void> {
    try {
        const { userId, message, type } = req.body;
        console.log('Datos recibidos:', { userId, message, type });
        
        const notification = await notificationService.sendNotification(
            parseInt(userId),
            message,
            1 // ID del servidor
        );
        
        res.status(201).json({
            message: "Notificación enviada correctamente",
            notification
        });
    } catch (error) {
        console.error('Error al enviar notificación:', error);
        res.status(500).json({ message: "Error al enviar la notificación" });
    }
}

export async function getUserNotifications(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        console.log('Buscando notificaciones para usuario:', userId);
        
        const notifications = await notificationService.getUserNotifications(userId);
        res.json(notifications);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ message: "Error al obtener las notificaciones" });
    }
}

export async function markNotificationAsRead(req: Request, res: Response): Promise<void> {
    try {
        const notificationId = parseInt(req.params.notificationId);
        console.log('Marcando como leída:', { notificationId });
        
        await notificationService.markAsRead(notificationId);
        res.json({ message: "Notificación marcada como leída" });
    } catch (error) {
        console.error('Error al marcar notificación:', error);
        res.status(500).json({ message: "Error al marcar la notificación" });
    }
}
