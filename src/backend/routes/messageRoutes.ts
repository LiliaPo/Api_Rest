import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/messageController';

const router = Router();

router.get('/:userId', getMessages);
router.post('/', sendMessage);

export default router; 