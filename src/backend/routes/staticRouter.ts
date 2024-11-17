import { Router } from 'express';
import path from 'path';

const router = Router();

// Página principal
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/index.html'));
});

// Página de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/login.html'));
});

// Página de registro
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/register.html'));
});

// Página de mensajería
router.get('/messages', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/messages.html'));
});

// Página de notificaciones
router.get('/notifications', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/notifications.html'));
});

export default router;

