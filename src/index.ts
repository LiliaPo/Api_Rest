import Express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { errorHandler, notFound } from './backend/middlewares/errorHandler.js';
import userRouter from './backend/routes/userRouter.js';
import messageRouter from './backend/routes/messageRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Express();
const defaultPort = 3000;
const port = process.env.PORT ? parseInt(process.env.PORT) : defaultPort;

// Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(Express.static('public'));

// Rutas API
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);

// Manejo de errores
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Accede a la aplicación en: http://localhost:${port}`);
});

// Manejo de errores del servidor
server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`Puerto ${port} en uso, intentando puerto ${port + 1}`);
        server.listen(port + 1);
    } else {
        console.error('Error del servidor:', error);
    }
});