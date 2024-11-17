import { Request, Response } from 'express';
import { userService } from '../services/userService';
import jwt from 'jsonwebtoken';
import { pool } from '../config/configDb';

export const register = async (req: Request, res: Response) => {
    try {
        const userData = {
            userName: req.body.userName,
            name: req.body.name,
            first_surname: req.body.first_surname,
            email: req.body.email,
            password: req.body.password
        };

        // Verificar si el nombre de usuario ya existe
        const existingUserName = await userService.findUserByUserName(userData.userName);
        if (existingUserName) {
            return res.status(400).json({ 
                message: 'El nombre de usuario ya está en uso. Por favor, elige otro.'
            });
        }

        // Verificar si el email ya existe
        const existingEmail = await userService.findUserByEmail(userData.email);
        if (existingEmail) {
            return res.status(400).json({ 
                message: 'El email ya está registrado'
            });
        }

        // Crear nuevo usuario
        const newUser = await userService.createUser(userData);

        res.status(201).json({
            success: true,
            message: 'Usuario registrado correctamente',
            user: {
                id: newUser.id,
                userName: newUser.userName,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.json({
            success: true,
            message: 'Login exitoso',
            user: {
                id: user.id,
                userName: user.userName,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const validateToken = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        res.json({ valid: true, user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const tableInfo = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'user'
        `);
        console.log('Estructura de la tabla:', tableInfo.rows);

        const query = `
            SELECT id, username, name, lastname, email 
            FROM "user" 
            ORDER BY id ASC
        `;
        
        const result = await pool.query(query);
        console.log('Resultado de la consulta:', result.rows);
        
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows);
        } else {
            console.log('No se encontraron usuarios');
            return res.status(200).json([]);
        }
    } catch (error) {
        console.error('Error detallado:', error);
        return res.status(500).json({ 
            message: 'Error al obtener usuarios',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
}; 