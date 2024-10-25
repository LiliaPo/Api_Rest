import Express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './configDb.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Express();
const port = 3000;

const publicPath = path.join(__dirname, '../public');
app.use(Express.static(publicPath));

app.use(Express.urlencoded({ extended: true }));

app.get('/', function (req: Express.Request, res: Express.Response) {
    const targetFilePath = path.join(publicPath, '/index.html');
    res.sendFile(targetFilePath);
});

app.get('/user', function (req: Express.Request, res: Express.Response) {
    const targetFilePath = path.join(publicPath, '/newUser.html');
    res.sendFile(targetFilePath);
});

app.get('/pagina2', function (req: Express.Request, res: Express.Response) {
    const targetFilePath = path.join(publicPath, '/pagina2.html');
    res.sendFile(targetFilePath);
});


app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});

app.post('/user', async function (req: Express.Request, res: Express.Response) {
    const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${req.body.username}', '${req.body.name}', '${req.body.surname}', '${req.body.password}','${req.body.email}')`;
    console.log(queryString);
    const result = await pool.query(queryString);
       res.send(result.rows);
});
