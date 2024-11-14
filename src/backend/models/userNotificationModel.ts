import pool from "../config/configDb.js";
import { Notification } from "./notificationModel.js";

export interface UserNotification extends Notification {
    user_id: number;
    leido: boolean;
}

export async function getUserNotifications(userId: number): Promise<UserNotification[]> {
    const queryString = `
        SELECT n.*, un.user_id, un.leido
        FROM notifications n
        JOIN user_notifications un ON n.id = un.notification_id
        WHERE un.user_id = $1
        ORDER BY n.fecha DESC`;
    const result = await pool.query(queryString, [userId]);
    return result.rows;
}

export async function markNotificationAsRead(userId: number, notificationId: number): Promise<void> {
    const queryString = `
        UPDATE user_notifications
        SET leido = true
        WHERE user_id = $1 AND notification_id = $2`;
    await pool.query(queryString, [userId, notificationId]);
} 