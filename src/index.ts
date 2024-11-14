import Express from 'express';
import { errorHandler } from './backend/middlewares/errorHandler';

const app = Express();
app.use(Express.json());
const port = 3000;



app.get('/', (req: Express.Request, res: Express.Response) => {
  res.send('<h1>Hello World!</h1>');
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
app.use(errorHandler);