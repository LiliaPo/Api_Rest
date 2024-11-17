import { Request, Response } from 'express';
import { messageService } from '../services/messageService';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        console.log('Obteniendo mensajes para usuario:', userId);
        
        const messages = await messageService.getMessages(userId);
        console.log('Mensajes encontrados:', messages);
        
        res.json(messages);
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ message: 'Error al obtener mensajes' });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { sender_id, receiver_id, content } = req.body;
        console.log('Enviando mensaje:', { sender_id, receiver_id, content });

        const message = await messageService.saveMessage({
            sender_id,
            receiver_id,
            content
        });

        console.log('Mensaje guardado:', message);
        res.status(201).json(message);
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ message: 'Error al enviar mensaje' });
    }
}; 