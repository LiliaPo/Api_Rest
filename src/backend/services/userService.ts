import pool from '../config/configDb';

export const getUsers = async () => {
    const result = await pool.query('SELECT * FROM "user"');
    return result.rows;
};

export const getUserById = async (id: number) => {
    const result = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return result.rows[0];
};

export const createUser = async (userName: string, name: string, firstSurname: string, email: string, password: string) => {
    const result = await pool.query(
        'INSERT INTO "user" (userName, name, first_surname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userName, name, firstSurname, email, password]
    );
    return result.rows[0];
};

export const updateUser = async (id: number, userName: string, name: string, firstSurname: string, email: string, password: string) => {
    const result = await pool.query(
        'UPDATE "user" SET userName = $1, name = $2, first_surname = $3, email = $4, password = $5 WHERE id = $6 RETURNING *',
        [userName, name, firstSurname, email, password, id]
    );
    return result.rows[0];
};

export const deleteUser = async (id: number) => {
    const result = await pool.query('DELETE FROM "user" WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};
