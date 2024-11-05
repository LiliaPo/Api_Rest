import { saveNewUser, getUsers, getUserById, findUserById } from "../models/userModel.js";
import { User } from "../types/user.js";


export async function newUser(user: User): Promise<string> {
    try {
        const result = await saveNewUser(user);
        return result;
    } catch (error: any) {
        if (error.code === "23505") {
            const columnMatch = error.detail.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            return `El ${columnName} ya existe en la base de datos`;
        }
        return error;
    }
}

export async function getAllUsers (): Promise<string> {
    const result = await getUsers ();
    return result;
}

export async function geUserById (id:string): Promise<string> {
    const result = await findUserById (id);
    return result;
}
