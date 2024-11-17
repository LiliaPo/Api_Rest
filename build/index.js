"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/frontend', express_1.default.static(path_1.default.join(__dirname, 'frontend')));
// Importar rutas
const serverRoutes_1 = __importDefault(require("./backend/routes/serverRoutes"));
// Rutas API
app.use('/api/server', serverRoutes_1.default);
// Rutas de páginas
app.get('/messaging', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/html/messaging.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
