import Express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Express();
const port = 3000;

const publicPath = path.join(__dirname, '../public');
app.use(Express.static(publicPath));



app.get('/', function (req: Express.Request, res: Express.Response) {
    const targetFilePath = path.join(publicPath, '/index.html');
    res.sendFile(targetFilePath);
});

app.get('/pagina2', function (req: Express.Request, res: Express.Response) {
    const targetFilePath = path.join(publicPath, '/pagina2.html');
    res.sendFile(targetFilePath);
});


app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});
