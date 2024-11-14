import { Request, Response } from 'express';
import * as notificationService from '../services/notificationService.js';

export async function sendNotification(req: Request, res: Response): Promise<void> {
    try {
        const { userId, message, type } = req.body;
        const notification = await notificationService.createNotification(message, type);
        await notificationService.assignNotificationToUser(userId, notification.id);
        res.status(201).json({ message: "Notificación enviada correctamente" });
    } catch (error) {
        console.error('Error al enviar notificación:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function getUserNotifications(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        const notifications = await notificationService.getUserNotifications(userId);
        res.json(notifications);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const validateNotification = (req: Request, res: Response, next: Function) => {
    // Lógica de validación aquí
    next(); // Llama a next() si la validación es exitosa
};
