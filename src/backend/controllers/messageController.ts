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

        console.log('Buscando mensajes para usuario:', userId); // Debug log

        const messages = await messageModel.getMessagesBetweenUsers(serverId, userId);
        console.log('Mensajes encontrados:', messages); // Debug log

        res.json({
            success: true,
            messages: messages
        });
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ message: "Error al obtener mensajes" });
    }
}

export async function sendMessage(req: Request, res: Response): Promise<void> {
    try {
        const { receiver_id, content } = req.body;
        const sender_id = 1; // ID del servidor

        if (!receiver_id || !content) {
            res.status(400).json({ message: "Faltan datos requeridos" });
            return;
        }

        console.log('Enviando mensaje:', { sender_id, receiver_id, content }); // Debug log

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