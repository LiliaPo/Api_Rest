import pool from "../config/configDb.js";

export interface User {
    id: number;
    userName: string;
    name: string;
    first_surname: string;
    password: string;
    email: string;
}

export async function saveNewUser(data: Partial<User>): Promise<User> {
    const queryString = `
        INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`;
    const values = [data.userName, data.name, data.first_surname, data.password, data.email];
    const result = await pool.query(queryString, values);
    return result.rows[0];
}

export async function getAllUsers(): Promise<User[]> {
    const queryString = `SELECT * FROM "user"`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function getUserById(userId: string): Promise<User | null> {
    const queryString = `SELECT * FROM "user" WHERE "id" = $1`;
    const result = await pool.query(queryString, [userId]);
    return result.rows[0] || null;
}

export function deleteUser(id: string): import("../types/DeleteResult.js").DeleteResult | PromiseLike<import("../types/DeleteResult.js").DeleteResult> {
    throw new Error('Function not implemented.');
}
