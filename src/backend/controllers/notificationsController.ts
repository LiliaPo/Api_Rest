import { Request, Response } from 'express';
import { messageModel, Message } from '../models/messageModel';
import { notificationModel } from '../models/notificationModel';

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const serverId = 1; // ID del servidor

        const messages = await messageModel.getMessagesBetweenUsers(userId, serverId);
        
        const sortedMessages = messages.sort((a: Message, b: Message) => {
            const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
            return dateB - dateA; // Orden descendente
        });

        res.json(sortedMessages);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
};

export const sendNotification = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const userId = parseInt(req.params.userId);
        const serverId = 1; // ID del servidor

        const message = await messageModel.saveMessage({
            sender_id: serverId,
            receiver_id: userId,
            content
        });

        res.status(201).json(message);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al enviar notificación' });
    }
}; 