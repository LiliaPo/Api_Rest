import { Request, Response } from 'express';
import * as userModel from '../models/userModel.js';

export async function getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: "Error al obtener usuarios" });
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
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: "Error al obtener usuario" });
    }
}

export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        console.log('Datos recibidos en el controlador:', req.body);

        const userData = {
            userName: req.body.userName,
            name: req.body.name,
            first_surname: req.body.first_surname,
            email: req.body.email,
            password: req.body.password
        };

        // Validar que todos los campos necesarios estén presentes
        const requiredFields = ['userName', 'name', 'first_surname', 'email', 'password'];
        for (const field of requiredFields) {
            if (!userData[field as keyof typeof userData]) {
                res.status(400).json({ message: `El campo ${field} es requerido` });
                return;
            }
        }

        const newUser = await userModel.saveNewUser(userData);
        res.status(201).json({
            success: true,
            message: "Usuario creado correctamente",
            user: newUser
        });
    } catch (error: any) {
        console.error('Error en createUser:', error);
        if (error.code === '23505') {
            res.status(409).json({ message: "El usuario o email ya existe" });
        } else {
            res.status(500).json({ message: "Error al crear usuario" });
        }
    }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const result = await userModel.deleteUser(req.params.id);
        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const updatedUser = await userModel.updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.json({ message: "Usuario actualizado correctamente", user: updatedUser });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error: any) {
        console.error('Error al actualizar usuario:', error);
        if (error.code === '23505') {
            res.status(409).json({ message: "El usuario o email ya existe" });
        } else {
            res.status(500).json({ message: "Error al actualizar usuario" });
        }
    }
}
