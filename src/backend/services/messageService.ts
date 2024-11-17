import { pool } from '../config/configDb';

interface Message {
    id?: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at?: Date;
}

export const messageService = {
    saveMessage: async (message: Message) => {
        try {
            const query = `
                INSERT INTO messages (sender_id, receiver_id, content, created_at)
                VALUES ($1, $2, $3, NOW())
                RETURNING *
            `;
            const result = await pool.query(query, [
                message.sender_id,
                message.receiver_id,
                message.content
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al guardar mensaje:', error);
            throw error;
        }
    },

    getMessages: async (userId: number) => {
        try {
            const query = `
                SELECT m.*, 
                       u1.userName as sender_name,
                       u2.userName as receiver_name
                FROM messages m
                JOIN "user" u1 ON m.sender_id = u1.id
                JOIN "user" u2 ON m.receiver_id = u2.id
                WHERE m.sender_id = $1 OR m.receiver_id = $1
                ORDER BY m.created_at DESC
            `;
            const result = await pool.query(query, [userId]);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener mensajes:', error);
            throw error;
        }
    }
}; 