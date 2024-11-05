import pool from "../config/configDb.js";

export async function saveNewUser(data:any):Promise<any>{
    const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${data.username}', '${data.name}', '${data.surname}', '${data.password}','${data.email}')`;
    const result = await pool.query(queryString);
    return result.rows;
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
export async function findUserById(id:string):Promise<any> {
   const queryString = 'SELECT *FROM "user" WHERE "id" = ${id}';
   const result = await pool.query(queryString);
   return result.rows;    
}