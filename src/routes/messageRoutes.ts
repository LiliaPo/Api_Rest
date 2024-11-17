import { Router } from 'express';
const router = Router();

// Ruta básica de prueba
router.get('/', (req, res) => {
    res.json({ message: 'Message routes funcionando' });
});

export default router; 