import { pool } from '../config/configDb';

// Definir la interfaz Message
interface Message {
    id?: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at?: Date;
    read?: boolean;
}

export async function getUserNotifications(userId: number): Promise<Message[]> {
    try {
        const query = `
            SELECT * FROM messages 
            WHERE receiver_id = $1 OR sender_id = $1 
            ORDER BY created_at DESC
        `;
        const result = await pool.query(query, [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        throw error;
    }
}

export async function sendNotification(receiverId: number, content: string, senderId: number): Promise<Message> {
    try {
        const query = `
            INSERT INTO messages (sender_id, receiver_id, content, created_at, read)
            VALUES ($1, $2, $3, NOW(), false)
            RETURNING *
        `;
        const values = [senderId, receiverId, content];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al enviar notificación:', error);
        throw error;
    }
}

export async function markAsRead(messageId: number): Promise<void> {
    try {
        const query = `
            UPDATE messages 
            SET read = true 
            WHERE id = $1
        `;
        await pool.query(query, [messageId]);
    } catch (error) {
        console.error('Error al marcar como leído:', error);
        throw error;
    }
}
