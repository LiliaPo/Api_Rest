import pool from "../config/configDb.js";

export interface Message {
    id?: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at?: Date;
    read?: boolean;
}

export async function getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]> {
    const queryString = `
        SELECT 
            m.*,
            s."userName" as sender_name,
            r."userName" as receiver_name
        FROM messages m
        LEFT JOIN "user" s ON m.sender_id = s.id
        LEFT JOIN "user" r ON m.receiver_id = r.id
        WHERE (m.sender_id = $1 AND m.receiver_id = $2)
           OR (m.sender_id = $2 AND m.receiver_id = $1)
        ORDER BY m.created_at ASC`;
    
    try {
        console.log('Buscando mensajes entre:', user1Id, user2Id);
        const result = await pool.query(queryString, [user1Id, user2Id]);
        console.log('Mensajes encontrados:', result.rows.length);
        return result.rows;
    } catch (error) {
        console.error('Error en getMessagesBetweenUsers:', error);
        throw error;
    }
}

export async function saveMessage(message: Message): Promise<Message> {
    const queryString = `
        INSERT INTO messages (sender_id, receiver_id, content, created_at, read)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, false)
        RETURNING *`;
    
    try {
        console.log('Guardando mensaje:', {
            sender_id: message.sender_id,
            receiver_id: message.receiver_id,
            content: message.content
        });
        
        const values = [message.sender_id, message.receiver_id, message.content];
        const result = await pool.query(queryString, values);
        
        console.log('Mensaje guardado:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en saveMessage:', error);
        throw error;
    }
}

export async function markMessageAsRead(messageId: number): Promise<void> {
    const queryString = `
        UPDATE messages 
        SET read = true 
        WHERE id = $1`;
    
    try {
        await pool.query(queryString, [messageId]);
    } catch (error) {
        console.error('Error en markMessageAsRead:', error);
        throw error;
    }
}

// Función para verificar mensajes
export async function checkMessages(userId: number): Promise<Message[]> {
    const queryString = `
        SELECT 
            m.*,
            s."userName" as sender_name,
            r."userName" as receiver_name
        FROM messages m
        LEFT JOIN "user" s ON m.sender_id = s.id
        LEFT JOIN "user" r ON m.receiver_id = r.id
        WHERE m.sender_id = $1 OR m.receiver_id = $1
        ORDER BY m.created_at ASC`;
    
    try {
        const result = await pool.query(queryString, [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error en checkMessages:', error);
        throw error;
    }
} 