import Express from 'express';
import userRouter from './userRouter.js';
import notificationRouter from './notificationRouter.js';

const apiRouter = Express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/notifications', notificationRouter);

export default apiRouter;