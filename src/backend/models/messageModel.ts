import pool from "../config/configDb.js";

export interface Message {
    id?: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at?: Date;
    read?: boolean;
}

export async function createMessage(message: Message): Promise<Message> {
    const queryString = `
        INSERT INTO messages (sender_id, receiver_id, content, created_at, read)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, false)
        RETURNING *`;
    const values = [message.sender_id, message.receiver_id, message.content];
    const result = await pool.query(queryString, values);
    return result.rows[0];
}

export async function getMessagesByUser(userId: number): Promise<Message[]> {
    const queryString = `
        SELECT * FROM messages 
        WHERE receiver_id = $1 OR sender_id = $1
        ORDER BY created_at DESC`;
    const result = await pool.query(queryString, [userId]);
    return result.rows;
}

export async function getUnreadMessages(userId: number): Promise<Message[]> {
    const queryString = `
        SELECT m.*, 
               u_sender.name as sender_name,
               u_sender.email as sender_email
        FROM messages m
        JOIN "user" u_sender ON m.sender_id = u_sender.id
        WHERE m.receiver_id = $1 
        AND m.read = false
        ORDER BY m.created_at DESC`;
    const result = await pool.query(queryString, [userId]);
    return result.rows;
}

export async function getMessageById(messageId: number): Promise<Message | null> {
    const queryString = `SELECT * FROM messages WHERE id = $1`;
    const result = await pool.query(queryString, [messageId]);
    return result.rows[0] || null;
}

export async function markMessageAsRead(messageId: number): Promise<void> {
    const queryString = `
        UPDATE messages 
        SET read = true 
        WHERE id = $1`;
    await pool.query(queryString, [messageId]);
} 