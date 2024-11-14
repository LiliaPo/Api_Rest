import Express from 'express';
import userRouter from './userRouter.js';
import notificationRouter from './notificationRouter';


const apiRouter = Express.Router();

apiRouter.use("/notifications", notificationRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;