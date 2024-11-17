import { Request, Response } from 'express';
import * as notificationService from '../services/notificationService.js';

export async function getUserMessages(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        const messages = await notificationService.getUserNotifications(userId);
        res.json({ messages });
    } catch (error) {
        handleError(error, res);
    }
}

export async function sendMessage(req: Request, res: Response): Promise<void> {
    try {
        const { receiver_id, content, sender_id } = req.body;
        const message = await notificationService.sendNotification(receiver_id, content, sender_id);
        res.status(201).json({ message: "Mensaje enviado correctamente", data: message });
    } catch (error) {
        handleError(error, res);
    }
}

function handleError(error: any, res: Response): void {
    console.error('Error en messageController:', error);
    res.status(500).json({ message: "Error en el servidor" });
} 