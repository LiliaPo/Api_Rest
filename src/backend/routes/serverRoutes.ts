import { Router } from 'express';
import {
    getAllUsers,
    sendMessage,
    getMessages,
    getNotifications,
    markNotificationAsRead
} from '../controllers/serverController';

const router = Router();

// Rutas de usuarios
router.get('/users', getAllUsers);

// Rutas de mensajes
router.post('/messages', sendMessage);
router.get('/messages/:userId', getMessages);

// Rutas de notificaciones
router.get('/notifications/:userId', getNotifications);
router.put('/notifications/:id/read', markNotificationAsRead);

export default router; 