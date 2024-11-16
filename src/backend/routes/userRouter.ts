import Express from 'express';
import { getAllUsers, getUserById, createUser, deleteUser } from '../controllers/userController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';

const userRouter = Express.Router();

// Ruta para crear nuevo usuario
userRouter.post('/', createUser);

// Otras rutas
userRouter.get('/', getAllUsers);
userRouter.get('/:id', validateNumericParams, getUserById);
userRouter.delete('/:id', validateNumericParams, deleteUser);

export default userRouter;

