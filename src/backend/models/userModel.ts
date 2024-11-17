import { pool } from '../config/configDb';

export interface User {
    id?: number;
    userName: string;
    name: string;
    first_surname: string;
    email: string;
    password: string;
}

export const userModel = {
    findUserById: async (id: number) => {
        const query = 'SELECT * FROM "user" WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    findUserByEmail: async (email: string) => {
        const query = 'SELECT * FROM "user" WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },

    createUser: async (userData: User) => {
        const query = `
            INSERT INTO "user" (userName, name, first_surname, email, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [userData.userName, userData.name, userData.first_surname, userData.email, userData.password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getAllUsers: async () => {
        const query = 'SELECT * FROM "user" ORDER BY id ASC';
        const result = await pool.query(query);
        return result.rows;
    },

    deleteUser: async (id: number) => {
        const query = 'DELETE FROM "user" WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
};
