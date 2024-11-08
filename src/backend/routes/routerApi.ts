import Express, { Request, Response } from 'express';
import { newUser, getAllUsers, deleteUser} from '../controllers/userController.js';
import { getUserById } from '../models/userModel.js';
import { User } from '../types/user.js';

const routerApi = Express.Router();

routerApi.get("/users", async (req: Express.Request, res: Express.Response)=>{
    const result = await getAllUsers();
    res.send(result);
} );

routerApi.get ("/users/:id", async (req: Express.Request, res: Express.Response) => {
    const id: number = parseInt(req.params.id);
    const result = await getUserById(id);
    res.json(result);
});

routerApi.post('/users', async function (req: Express.Request, res: Express.Response) {
    const user: User = {userName: req.body.username, name: req.body.name, first_surname: req.body.surname, email: req.body.email, password: req.body.password};
    const result = await newUser(user);
    res.send(result);
});

routerApi.delete("/users/:id", async (req: Express.Request, res: Express.Response) =>{
    const id: number = parseInt(req.params.id);
    const result = await deleteUser(id);
    res.send(result)
});


export default routerApi;