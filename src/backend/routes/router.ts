import Express, { Request, Response } from 'express';
import path from 'path';
import { publicPath } from '../config/configData.js';
import { newUser, getAllUsers } from '../controllers/userController.js';
import { getUserById } from '../models/userModel.js';


const router = Express.Router();

router.get('/newUser', function (req: Request, res: Response) {
    const targetFilePath = path.join(publicPath, '/newUser.html');
    res.sendFile(targetFilePath);
});

router.get('/usersManagement', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, '/usersManagement.html');
    res.sendFile(targetFilePath);
})

export { router };