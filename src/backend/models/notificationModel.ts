import pool from "../config/configDb.js";

export interface Notification {
    id: number;
    mensaje: string;
    fecha: Date;
    tipo: string;
}

export async function createNotification(mensaje: string, tipo: string): Promise<Notification> {
    const queryString = `
        INSERT INTO notifications (mensaje, tipo, fecha)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        RETURNING *`;
    const result = await pool.query(queryString, [mensaje, tipo]);
    return result.rows[0];
}

export async function getNotificationById(id: number): Promise<Notification | null> {
    const queryString = `SELECT * FROM notifications WHERE id = $1`;
    const result = await pool.query(queryString, [id]);
    return result.rows[0] || null;
} 