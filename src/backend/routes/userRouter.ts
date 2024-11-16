import Express from 'express';
import { getAllUsers, getUserById, createUser, deleteUser, loginUser } from '../controllers/userController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { validateUserInput } from '../middlewares/validateUserInput.js';

const userRouter = Express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', validateNumericParams, getUserById);
userRouter.post('/', validateUserInput, createUser);
userRouter.post('/login', loginUser);
userRouter.delete('/:id', validateNumericParams, deleteUser);

export default userRouter;

