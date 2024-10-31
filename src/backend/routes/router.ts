import Express, { Request, Response } from 'express';
import path from 'path';
import { publicPath } from '../config/configData.js';
import { newUser, getAllUsers } from '../controllers/userController.js';
import { getUserById } from '../models/userModel.js';


const router = Express.Router();

router.get("/users", async (req: Request, res: Response)=>{
    const result = await getAllUsers();
    res.send(result);
} );

router.get('/', function (req: Request, res: Response) {
    const targetFilePath = path.join(publicPath, '/index.html');
    res.sendFile(targetFilePath);
});
router.get ("/users/:id", async (req: Request, res: Response) => {
    const result = await getUserById(req.params.id);
    res.send(result);
});

router.get('/user', function (req: Request, res: Response) {
    const targetFilePath = path.join(publicPath, '/newUser.html');
    res.sendFile(targetFilePath);
});

router.post('/users', async function (req: Request, res: Response) {
    const result = await newUser(req.body);
    res.send(result);
});

router.get('/pagina2', function (req: Request, res: Response) {
    const targetFilePath = path.join(publicPath, '/pagina2.html');
    res.sendFile(targetFilePath);
});

export { router };