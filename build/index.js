import Express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = Express();
var port = 3000;
var publicPath = path.join(__dirname, '../public');
app.use(Express.static(publicPath));
app.get('/', function (req, res) {
    var targetFilePath = path.join(publicPath, '/index.html');
    res.sendFile(targetFilePath);
});
app.get('/pagina2', function (req, res) {
    var targetFilePath = path.join(publicPath, '/pagina2.html');
    res.sendFile(targetFilePath);
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
