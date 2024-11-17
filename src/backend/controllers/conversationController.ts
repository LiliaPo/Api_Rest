import { Request, Response } from 'express';
import { userModel } from '../models/userModel';
import { messageModel, Message } from '../models/messageModel';

export const getConversation = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const serverId = 1; // ID del servidor

        const user = await userModel.findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const messages = await messageModel.getMessagesBetweenUsers(serverId, userId);
        
        // Ordenar mensajes por fecha
        const sortedMessages = messages.sort((a: Message, b: Message) => {
            const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
            return dateA - dateB;
        });

        res.json(sortedMessages);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener conversación' });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
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
        res.status(500).json({ message: 'Error al enviar mensaje' });
    }
}; 