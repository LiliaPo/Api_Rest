import { Request, Response } from 'express';
import * as userModel from '../models/userModel.js';
import { User } from '../types/user.js';
import { DeleteResult } from '../types/DeleteResult.js';

export async function getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const result = await userModel.getAllUsers();
        if (!result || result.length === 0) {
            res.status(404).json({ message: "No se encontraron usuarios" });
            return;
        }
        res.json(result);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const user: User = {
            userName: req.body.username,
            name: req.body.name,
            first_surname: req.body.surname,
            email: req.body.email,
            password: req.body.password
        };

        const result = await userModel.saveNewUser(user);
        res.status(201).json({ 
            message: "Usuario creado correctamente",
            user: result 
        });
    } catch (error: any) {
        console.error('Error al crear usuario:', error);
        if (error.code === '23505') {
            res.status(409).json({ 
                message: "El usuario o email ya existe en la base de datos" 
            });
            return;
        }
        res.status(500).json({ 
            message: "Error interno del servidor al crear el usuario" 
        });
    }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const result: DeleteResult = await userModel.deleteUser(req.params.id);
        let statusCode = 200;
        
        if (!result.success && result.rowsAffected === 0) {
            statusCode = 404;
        }
        if (!result.success && !("rowsAffected" in result)) {
            statusCode = 500;
        }
        
        res.status(statusCode).json({message: result.message});
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
