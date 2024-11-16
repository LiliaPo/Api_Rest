import { Request, Response } from 'express';
import * as messageModel from '../models/messageModel.js';

export async function getUserMessages(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        const serverId = 1; // ID del servidor

        if (isNaN(userId)) {
            res.status(400).json({ message: "ID de usuario inválido" });
            return;
        }

        // Obtener todos los mensajes entre el usuario y el servidor
        const messages = await messageModel.getMessagesBetweenUsers(serverId, userId);

        // Ordenar mensajes por fecha
        const sortedMessages = messages.sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
            return dateA - dateB;
        });

        console.log('Mensajes encontrados:', {
            userId,
            serverId,
            totalMessages: messages.length,
            messages: sortedMessages
        });

        res.json({
            success: true,
            messages: sortedMessages
        });
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ message: "Error al obtener mensajes" });
    }
}

export async function sendMessage(req: Request, res: Response): Promise<void> {
    try {
        const { receiver_id, content, sender_id } = req.body;

        if (!receiver_id || !content) {
            res.status(400).json({ message: "Faltan datos requeridos" });
            return;
        }

        // Validar IDs
        const receiverId = parseInt(receiver_id);
        const senderId = sender_id ? parseInt(sender_id) : 1; // Si no se especifica, es el servidor

        if (isNaN(receiverId)) {
            res.status(400).json({ message: "ID de receptor inválido" });
            return;
        }

        console.log('Guardando mensaje:', {
            sender_id: senderId,
            receiver_id: receiverId,
            content
        });

        const message = await messageModel.saveMessage({
            sender_id: senderId,
            receiver_id: receiverId,
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

// Nueva función para obtener todos los mensajes de un usuario
export async function getAllUserMessages(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);

        if (isNaN(userId)) {
            res.status(400).json({ message: "ID de usuario inválido" });
            return;
        }

        const messages = await messageModel.checkMessages(userId);
        
        console.log('Todos los mensajes del usuario:', {
            userId,
            totalMessages: messages.length
        });

        res.json({
            success: true,
            messages: messages
        });
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ message: "Error al obtener mensajes" });
    }
} 