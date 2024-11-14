import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    max: 10,            // Máximo de conexiones en el pool
    idleTimeoutMillis: 30000, // Tiempo de espera de conexiones inactivas antes de cerrarlas
    connectionTimeoutMillis: 2000, // Tiempo de espera para establecer una conexión
});

pool.on('error', (err) => {
    console.error('Error en el pool de base de datos:', err);
});

const createTables = async () => {
  try {
    // Crear tabla notifications
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        mensaje TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        tipo VARCHAR(50)
      );
    `);

    // Crear tabla user_notifications
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_notifications (
        user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
        notification_id INTEGER REFERENCES notifications(id) ON DELETE CASCADE,
        leido BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (user_id, notification_id)
         );
    `);

    console.log("Tablas de notificaciones creadas o verificadas.");
  } catch (error) {
    console.error("Error al crear las tablas de notificaciones:", error);
  }
};

// Ejecutar la creación de tablas cuando inicie el servidor
createTables().catch(console.error);

export default pool;