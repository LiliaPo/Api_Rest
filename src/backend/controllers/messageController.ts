import { Request, Response } from 'express';
import * as messageModel from '../models/messageModel.js';
import * as userModel from '../models/userModel.js';

export async function sendMessage(req: Request, res: Response): Promise<void> {
    try {
        const { receiver_id, content } = req.body;
        
        // Obtener el sender_id del token o sesión
        const sender_id = req.body.sender_id; // Por ahora lo obtenemos del body

        if (!sender_id) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }

        // Validar que el contenido no esté vacío
        if (!content || content.trim().length === 0) {
            res.status(400).json({ message: "El contenido del mensaje no puede estar vacío" });
            return;
        }

        // Validar longitud del mensaje
        if (content.length > 1000) {
            res.status(400).json({ message: "El mensaje excede el límite de caracteres permitido" });
            return;
        }

        // Verificar que el remitente existe
        const sender = await userModel.getUserById(sender_id.toString());
        if (!sender) {
            res.status(404).json({ message: "El remitente no existe" });
            return;
        }

        // Verificar que el destinatario existe
        const receiver = await userModel.getUserById(receiver_id.toString());
        if (!receiver) {
            res.status(404).json({ message: "El destinatario no existe" });
            return;
        }

        // Crear el mensaje
        const message = await messageModel.createMessage({
            sender_id,
            receiver_id,
            content
        });

        res.status(201).json({
            message: "Mensaje enviado correctamente",
            data: message
        });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function getUserMessages(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        
        // Verificar que el usuario existe
        const user = await userModel.getUserById(userId.toString());
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        // Obtener mensajes con información detallada
        const messages = await messageModel.getMessagesByUser(userId);
        
        // Separar mensajes enviados y recibidos
        const sentMessages = messages.filter(msg => msg.sender_id === userId);
        const receivedMessages = messages.filter(msg => msg.receiver_id === userId);

        // Contar mensajes no leídos
        const unreadCount = receivedMessages.filter(msg => !msg.read).length;

        res.json({
            userId: userId,
            messageStats: {
                total: messages.length,
                sent: sentMessages.length,
                received: receivedMessages.length,
                unread: unreadCount
            },
            messages: {
                sent: sentMessages,
                received: receivedMessages
            }
        });
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// Nueva función para obtener mensajes no leídos
export async function getUnreadMessages(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        
        // Verificar que el usuario existe
        const user = await userModel.getUserById(userId.toString());
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        const unreadMessages = await messageModel.getUnreadMessages(userId);
        
        res.json({
            userId: userId,
            unreadCount: unreadMessages.length,
            messages: unreadMessages
        });
    } catch (error) {
        console.error('Error al obtener mensajes no leídos:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// Nueva función para marcar mensaje como leído
export async function markMessageAsRead(req: Request, res: Response): Promise<void> {
    try {
        const messageId = parseInt(req.params.messageId);
        const userId = parseInt(req.params.userId);

        // Verificar que el mensaje existe y pertenece al usuario
        const message = await messageModel.getMessageById(messageId);
        if (!message) {
            res.status(404).json({ message: "Mensaje no encontrado" });
            return;
        }

        if (message.receiver_id !== userId) {
            res.status(403).json({ message: "No tienes permiso para marcar este mensaje como leído" });
            return;
        }

        await messageModel.markMessageAsRead(messageId);
        res.json({ message: "Mensaje marcado como leído" });
    } catch (error) {
        console.error('Error al marcar mensaje como leído:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
} 