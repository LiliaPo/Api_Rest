import { Request, Response } from 'express';
import * as messageModel from '../models/messageModel.js';

export async function getUserMessages(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        const currentUserId = 1; // ID del usuario actual (por ahora hardcodeado)
        
        // Obtener todos los mensajes entre los dos usuarios
        const messages = await messageModel.getMessagesBetweenUsers(currentUserId, userId);
        
        res.json({
            success: true,
            messages: messages.map(msg => ({
                ...msg,
                isReceived: msg.sender_id === userId // Para identificar si es recibido o enviado
            }))
        });
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ message: "Error al obtener mensajes" });
    }
}

export async function sendMessage(req: Request, res: Response): Promise<void> {
    try {
        const { receiver_id, content } = req.body;
        const sender_id = 1; // ID del usuario actual (por ahora hardcodeado)

        const message = await messageModel.saveMessage({
            sender_id,
            receiver_id: parseInt(receiver_id),
            content
        });

        res.status(201).json({
            success: true,
            message: "Mensaje enviado correctamente",
            data: message
        });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ message: "Error al enviar mensaje" });
    }
} 