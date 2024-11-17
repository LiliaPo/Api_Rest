import express from 'express';
import path from 'path';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Importar rutas
import serverRoutes from './backend/routes/serverRoutes';

// Rutas API
app.use('/api/server', serverRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Rutas disponibles:');
    console.log('- GET  /api/server/getAllUsers');
    console.log('- GET  /api/server/users/:id');
    console.log('- PUT  /api/server/users/:id');
    console.log('- DELETE /api/server/users/:id');
});