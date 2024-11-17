import express from 'express';
import path from 'path';
import staticRouter from './routes/staticRouter';
import { publicPath } from './config/configData';

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(publicPath));

// Rutas estáticas
app.use('/', staticRouter);

export default app;


