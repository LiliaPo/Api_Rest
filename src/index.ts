import express from 'express';
import path from 'path';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

// Importar rutas
import serverRoutes from './backend/routes/serverRoutes';

// Rutas API
app.use('/api/server', serverRoutes);

// Rutas de páginas
app.get('/messaging', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/messaging.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});