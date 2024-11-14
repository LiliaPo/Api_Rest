import Express from 'express';
import { sendNotification, getUserNotifications } from '../controllers/notificationController.js';


const notificationRouter = Express.Router();

notificationRouter.post('/', sendNotification);
notificationRouter.get('/:userId', getUserNotifications);

export default notificationRouter;
