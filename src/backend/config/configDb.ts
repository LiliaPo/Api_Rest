import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Verificar que todas las variables necesarias estén definidas
if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error('Error: Variables de entorno de base de datos no definidas');
    process.exit(1);
}

// Configuración de la conexión
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432')
});

// Verificar conexión
pool.connect()
    .then(client => {
        console.log('Conexión exitosa a PostgreSQL');
        console.log(`Conectado a: ${process.env.DB_NAME}`);
        client.release();
    })
    .catch(err => {
        console.error('Error conectando a PostgreSQL:', {
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            error: err.message
        });
    });

export default pool;