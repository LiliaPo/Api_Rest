import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'activa2024',
    password: process.env.DB_PASSWORD || 'Ferranito14',
    port: parseInt(process.env.DB_PORT || '5432')
});

// Verificar conexión
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Conexión exitosa a la base de datos');
        
        try {
            await client.query('SELECT * FROM "user" LIMIT 1');
            console.log('Tabla user verificada');
        } catch (err) {
            console.error('Error al verificar tabla user:', err);
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Error al conectar con la base de datos:', err);
    }
};

// Ejecutar test de conexión
testConnection();

export { pool };