import Express, { Router } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser } from '../controllers/userController.js';
import { sendMessage, getUserMessages } from '../controllers/messageController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { validateUserInput } from '../middlewares/validateUserInput.js';
import { validateMessage } from '../middlewares/validateMessage.js';

const userRouter: Router = Express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", validateNumericParams, getUserById);
userRouter.post("/", validateUserInput, createUser);
userRouter.delete("/:id", validateNumericParams, deleteUser);

userRouter.post("/:id/messages", validateMessage, sendMessage);
userRouter.get("/:id/messages", validateNumericParams, getUserMessages);

export default userRouter;
