import { Request, Response } from 'express';
import * as userModel from '../models/userModel.js';

export async function getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        handleError(error, res);
    }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.id);
        const user = await userModel.findUserById(userId);
        
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        res.json(user);
    } catch (error) {
        handleError(error, res);
    }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const userId = parseInt(req.params.id);
        await userModel.deleteUser(userId);
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        handleError(error, res);
    }
}

export async function createUser(req: Request, res: Response): Promise<void> {
    // ... código de creación de usuario
}

export async function loginUser(req: Request, res: Response): Promise<void> {
    // ... código de login
}

function handleError(error: any, res: Response): void {
    console.error('Error en userController:', error);
    res.status(500).json({ message: "Error en el servidor" });
}
