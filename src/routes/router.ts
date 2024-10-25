import Express from 'express';
import path from 'path';
import pool from '../configDb.js';
import { publicPath } from '../configData.js';


const router = Express.Router();

router.get('/', function (req: Express.Request, res: Express.Response) {
    const targetFilePath = path.join(publicPath, '/index.html');
    res.sendFile(targetFilePath);
});

router.get('/user', function (req: Express.Request, res: Express.Response) {
    const targetFilePath = path.join(publicPath, '/newUser.html');
    res.sendFile(targetFilePath);
});

router.post('/user', async function (req: Express.Request, res: Express.Response) {
        const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${req.body.username}', '${req.body.name}', '${req.body.surname}', '${req.body.password}','${req.body.email}')`;
        console.log(queryString);
        const result = await pool.query(queryString);
           res.send(result.rows);
 });
  

router.get('/pagina2', function (req: Express.Request, res: Express.Response) {
    const targetFilePath = path.join(publicPath, '/pagina2.html');
    res.sendFile(targetFilePath);
});

export { router };