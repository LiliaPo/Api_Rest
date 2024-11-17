import { pool } from '../config/configDb';

export interface Message {
    id?: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at?: Date;
    read?: boolean;
}

export const messageModel = {
    saveMessage: async (message: Message) => {
        const query = `
            INSERT INTO messages (sender_id, receiver_id, content, created_at, read)
            VALUES ($1, $2, $3, NOW(), false)
            RETURNING *
        `;
        const values = [message.sender_id, message.receiver_id, message.content];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getMessagesBetweenUsers: async (userId1: number, userId2: number) => {
        const query = `
            SELECT * FROM messages 
            WHERE (sender_id = $1 AND receiver_id = $2)
            OR (sender_id = $2 AND receiver_id = $1)
            ORDER BY created_at DESC
        `;
        const result = await pool.query(query, [userId1, userId2]);
        return result.rows;
    },

    markMessageAsRead: async (messageId: number) => {
        const query = 'UPDATE messages SET read = true WHERE id = $1';
        await pool.query(query, [messageId]);
    }
}; 