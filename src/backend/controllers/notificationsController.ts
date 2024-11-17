import { Request, Response } from 'express';
import * as messageModel from '../models/messageModel.js';

export async function getUserNotifications(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        const serverId = 1; // ID del servidor

        if (isNaN(userId)) {
            res.status(400).json({ message: "ID de usuario inválido" });
            return;
        }

        const messages = await messageModel.getMessagesBetweenUsers(userId, serverId);
        
        // Ordenar mensajes por fecha
        const sortedMessages = messages.sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
            return dateA - dateB;
        });

        res.json({
            success: true,
            messages: sortedMessages
        });
    } catch (error) {
        handleError(error, res);
    }
}

export async function sendNotification(req: Request, res: Response): Promise<void> {
    try {
        const { receiver_id, content, sender_id } = req.body;

        if (!validateMessageData(receiver_id, content)) {
            res.status(400).json({ message: "Datos de mensaje inválidos" });
            return;
        }

        const message = await messageModel.saveMessage({
            sender_id: parseInt(sender_id),
            receiver_id: parseInt(receiver_id),
            content
        });

        res.status(201).json({
            success: true,
            message: "Mensaje enviado correctamente",
            data: message
        });
    } catch (error) {
        handleError(error, res);
    }
}

function validateMessageData(receiver_id: any, content: string): boolean {
    return Boolean(
        receiver_id &&
        content &&
        !isNaN(parseInt(receiver_id))
    );
}

function handleError(error: any, res: Response): void {
    console.error('Error en notificaciones:', error);
    res.status(500).json({ message: "Error en el servidor" });
} 