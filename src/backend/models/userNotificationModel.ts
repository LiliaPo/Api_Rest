import { pool } from '../config/configDb';
import { Notification } from './notificationModel';

export interface UserNotification extends Notification {
    userName?: string;
}

export const userNotificationModel = {
    getUserNotifications: async (userId: number): Promise<UserNotification[]> => {
        const query = `
            SELECT n.*, u.userName
            FROM notifications n
            JOIN "user" u ON n.user_id = u.id
            WHERE n.user_id = $1
            ORDER BY n.created_at DESC
        `;
        const result = await pool.query(query, [userId]);
        return result.rows;
    }
}; 