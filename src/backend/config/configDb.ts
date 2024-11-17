import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432')
});

// Test de conexión
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Conexión exitosa a la base de datos');
        
        const result = await client.query('SELECT * FROM "user"');
        console.log('Usuarios encontrados:', result.rows);
        
        client.release();
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

// Ejecutar test de conexión
testConnection();

export { pool };