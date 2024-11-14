import pool from '../config/configDb.js';

export interface Notification {
    id: number;
    message: string;
    type: string;
    created_at: Date;
}

export async function createNotification(message: string, type: string): Promise<Notification> {
    const queryString = `
        INSERT INTO notifications (message, type, created_at)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        RETURNING *`;
    const result = await pool.query(queryString, [message, type]);
    return result.rows[0];
}

export async function assignNotificationToUser(userId: number, notificationId: number): Promise<void> {
    const queryString = `
        INSERT INTO user_notifications (user_id, notification_id, read)
        VALUES ($1, $2, false)`;
    await pool.query(queryString, [userId, notificationId]);
}

export async function getUserNotifications(userId: number): Promise<Notification[]> {
    const queryString = `
        SELECT n.* FROM notifications n
        JOIN user_notifications un ON n.id = un.notification_id
        WHERE un.user_id = $1
        ORDER BY n.created_at DESC`;
    const result = await pool.query(queryString, [userId]);
    return result.rows;
}
