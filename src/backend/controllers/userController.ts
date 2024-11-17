import { Request, Response } from 'express';
import { userModel } from '../models/userModel';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await userModel.findUserById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        await userModel.deleteUser(userId);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const userData = req.body;
        
        const user = await userModel.findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Aquí iría la lógica de actualización cuando la implementemos en el modelo
        
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

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
