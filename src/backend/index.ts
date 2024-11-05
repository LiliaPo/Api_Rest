import Express from 'express';
import { publicPath } from './config/configData.js';
import { router } from './routes/router.js';
import routerApi from './routes/routerApi.js';

const app = Express();
const port = 3000;

app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(publicPath));

app.use("/", router);
app.use("/api/v1/", routerApi);


app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});
