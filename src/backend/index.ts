import Express from 'express';
import { publicPath } from './config/configData.js';
<<<<<<< HEAD
import { router } from './routes/router.js';
import routerApi from './routes/routerApi.js';
=======
import { staticRouter } from './routes/staticRouter.js';
import apiRouter from './routes/apiRouter.js';
>>>>>>> upstream/develop

const app = Express();
const port = 3000;

app.use(Express.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use(Express.static(publicPath));

app.use("/", router);
app.use("/api/v1/", routerApi);


app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});
=======

app.use(Express.static(publicPath));

app.use("/", staticRouter);
app.use("/api/v1/", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
>>>>>>> upstream/develop
