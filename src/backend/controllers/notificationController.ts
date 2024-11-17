import { Request, Response } from 'express';
import { messageModel } from '../models/messageModel';
import { notificationService } from '../services/notificationService';

// Obtener notificaciones de un usuario
export const getNotifications = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const messages = await notificationService.getMessages(userId);
        res.json(messages);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
};

// Enviar una notificación
export const sendNotification = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const userId = parseInt(req.params.userId);
        const serverId = 1; // ID del servidor

        const message = await notificationService.sendMessage(serverId, userId, content);
        res.status(201).json(message);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al enviar notificación' });
    }
};

// Marcar notificación como leída
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const messageId = parseInt(req.params.id);
        await messageModel.markMessageAsRead(messageId);
        res.json({ message: 'Mensaje marcado como leído' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al marcar mensaje como leído' });
    }
};
