import pool from "../config/configDb.js";
<<<<<<< HEAD

export async function saveNewUser(data:any):Promise<any>{
    const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${data.username}', '${data.name}', '${data.surname}', '${data.password}','${data.email}')`;
    const result = await pool.query(queryString);
    return result.rows;
}
export async function getUsers(): Promise<any> {
=======
import { DeleteResult } from "../types/DeleteResult.js";
import { User } from "../types/User.js";


export async function saveNewUser(user:User):Promise<any>{
    const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${user.userName}', '${user.name}', '${user.first_surname}', '${user.password}','${user.email}')`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function getUsers():Promise<any>{  
>>>>>>> upstream/develop
    const queryString = `SELECT * FROM "user"`;
    const result = await pool.query(queryString);
    return result.rows;
}

<<<<<<< HEAD
export async function getUserById(id:number): Promise<any> {
    const queryString = `SELECT * FROM "user" WHERE "id" = $(id)`;
    const result = await pool.query(queryString, [id]);
    return result.rows[0];
}
export async function findUserById(id:number):Promise<any> {
   const queryString = 'SELECT *FROM "user" WHERE "id" = ${id}';
   const result = await pool.query(queryString);
   return result.rows;    
}
export async function deleteUserById(id:number): Promise<any>{
    const queryString = 'DELETE FROM "user" WHERE "id" = ${id}';
    const result = await pool.query(queryString);
    return result.rows;
}
=======
export async function findUserById(id:string):Promise<any>{
    const queryString = `SELECT * FROM "user" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function deleteUserById(id: string): Promise<DeleteResult> {
    try {
        const queryString = `DELETE FROM "user" WHERE "id" = ${id}`;
        const result = await pool.query(queryString);
        
        if (result.rowCount && result.rowCount > 0) {
            return {
                success: true,
                message: 'Usuario eliminado correctamente',
                rowsAffected: result.rowCount
            };
        } else {
            return {
                success: false,
                message: 'No se encontró el usuario',
                rowsAffected: 0
            };
        }
    } catch (error) {
        return {
            success: false,
            message: `Error al eliminar usuario: ${(error as Error).message}`
        };
    }
}   
>>>>>>> upstream/develop
