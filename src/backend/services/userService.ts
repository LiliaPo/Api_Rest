import { pool } from '../config/configDb';

export const userService = {
    getAllUsers: async () => {
        return (await pool.query('SELECT * FROM "user" ORDER BY id ASC')).rows;
    },

    updateUser: async (id: number, data: any) => {
        return (await pool.query(
            'UPDATE "user" SET "userName" = $1, name = $2, first_surname = $3, email = $4 WHERE id = $5 RETURNING *',
            [data.userName, data.name, data.first_surname, data.email, id]
        )).rows[0];
    },

    deleteUser: async (id: number) => {
        return (await pool.query('DELETE FROM "user" WHERE id = $1 RETURNING *', [id])).rows[0];
    }
};
