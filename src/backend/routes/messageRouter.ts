import Express from 'express';
import { sendMessage, getUserMessages } from '../controllers/messageController.js';

const messageRouter = Express.Router();

messageRouter.post('/', sendMessage);
messageRouter.get('/:userId', getUserMessages);

export default messageRouter; 