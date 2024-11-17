import { Request, Response } from 'express';
import { messageModel } from '../models/messageModel';
import { userModel } from '../models/userModel';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.getAllUsers();
        console.log('Usuarios encontrados:', users);
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { sender_id, receiver_id, content } = req.body;
        const message = await messageModel.saveMessage({
            sender_id,
            receiver_id,
            content
        });
        res.status(201).json(message);
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ message: 'Error al enviar mensaje' });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const messages = await messageModel.getMessagesBetweenUsers(userId, userId);
        res.json(messages);
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ message: 'Error al obtener mensajes' });
    }
};

export const markMessageAsRead = async (req: Request, res: Response) => {
    try {
        const messageId = parseInt(req.params.id);
        await messageModel.markMessageAsRead(messageId);
        res.json({ message: 'Mensaje marcado como leído' });
    } catch (error) {
        console.error('Error al marcar mensaje como leído:', error);
        res.status(500).json({ message: 'Error al marcar mensaje como leído' });
    }
}; 