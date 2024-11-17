import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = Router();

router.get('/:userId', getMessages);
router.post('/', sendMessage);

export default router; 