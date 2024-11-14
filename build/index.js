import Express from 'express';
import { errorHandler } from './backend/middlewares/errorHandler';
var app = Express();
app.use(Express.json());
var port = 3000;
app.get('/', function (req, res) {
    res.send('<h1>Hello World!</h1>');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
app.use(errorHandler);
