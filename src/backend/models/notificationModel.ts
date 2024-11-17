import { pool } from '../config/configDb';

export interface Notification {
    id?: number;
    user_id: number;
    message: string;
    type: string;
    created_at?: Date;
    read?: boolean;
}

export const notificationModel = {
    createNotification: async (notification: Notification) => {
        const query = `
            INSERT INTO notifications (user_id, message, type, created_at, read)
            VALUES ($1, $2, $3, NOW(), false)
            RETURNING *
        `;
        const values = [notification.user_id, notification.message, notification.type];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getNotificationsByUser: async (userId: number) => {
        const query = `
            SELECT n.*, u.userName
            FROM notifications n
            JOIN "user" u ON n.user_id = u.id
            WHERE n.user_id = $1
            ORDER BY n.created_at DESC
        `;
        const result = await pool.query(query, [userId]);
        return result.rows;
    },

    markAsRead: async (notificationId: number) => {
        const query = `
            UPDATE notifications
            SET read = true
            WHERE id = $1
            RETURNING *
        `;
        const result = await pool.query(query, [notificationId]);
        return result.rows[0];
    }
}; 