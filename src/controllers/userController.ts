import { Request, Response } from 'express';
import { saveNewUser, getUserById as fetchUserById, getUsers } from "../models/userModel.js";

export async function newUser(data: any): Promise<string> {
    try {
        const result = await saveNewUser(data);
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

export async function getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    try {
        const user = await fetchUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al obtener el usuario");
    }
}