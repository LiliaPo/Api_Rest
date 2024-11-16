import pool from "../config/configDb.js";

export interface Notification {
    id: number;
    message: string;
    type: string;
    created_at: Date;
    read?: boolean;
}

// Crear notificación
export async function createNotification(message: string, type: string): Promise<Notification> {
    const queryString = `
        INSERT INTO notifications (message, type, created_at)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        RETURNING *`;
    const result = await pool.query(queryString, [message, type]);
    return result.rows[0];
}

// Asignar notificación a usuario
export async function assignNotificationToUser(userId: number, notificationId: number): Promise<void> {
    const queryString = `
        INSERT INTO user_notifications (user_id, notification_id, read)
        VALUES ($1, $2, false)`;
    await pool.query(queryString, [userId, notificationId]);
}

// Obtener notificaciones de usuario
export async function getUserNotifications(userId: number): Promise<Notification[]> {
    const queryString = `
        SELECT n.*, un.read
        FROM notifications n
        JOIN user_notifications un ON n.id = un.notification_id
        WHERE un.user_id = $1
        ORDER BY n.created_at DESC`;
    const result = await pool.query(queryString, [userId]);
    return result.rows;
}

// Marcar notificación como leída
export async function markNotificationAsRead(userId: number, notificationId: number): Promise<void> {
    const queryString = `
        UPDATE user_notifications
        SET read = true
        WHERE user_id = $1 AND notification_id = $2`;
    await pool.query(queryString, [userId, notificationId]);
}

export async function getNotificationById(id: number): Promise<Notification | null> {
    const queryString = `SELECT * FROM notifications WHERE id = $1`;
    const result = await pool.query(queryString, [id]);
    return result.rows[0] || null;
} 