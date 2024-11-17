import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
    try {
        console.log('Datos recibidos:', req.body);
        
        // 1. Crear el usuario en la BD
        const newUser = await userService.createUser(req.body);
        console.log('Usuario creado:', newUser);

        // 2. Devolver respuesta exitosa
        res.status(201).json({
            success: true,
            message: 'Usuario registrado correctamente',
            user: newUser
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear usuario',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}; 