import pool from "../config/configDb.js";

export async function saveNewUser(data: any): Promise<any> {
    // Lógica para guardar un nuevo usuario
}

export async function getUsers(): Promise<any> {
    const queryString = `SELECT * FROM "user"`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function getUserById(id: string): Promise<any> {
    const queryString = `SELECT * FROM "user" WHERE "id" = $(id)`;
    const result = await pool.query(queryString, [id]);
    return result.rows[0];
}