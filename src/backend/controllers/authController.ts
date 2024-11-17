import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/configDb';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret');
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { userName, name, first_surname, email, password } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await pool.query(
            'SELECT * FROM "user" WHERE email = $1 OR userName = $2',
            [email, userName]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'El usuario o email ya existe' });
        }

        // Insertar nuevo usuario
        const result = await pool.query(
            'INSERT INTO "user" (userName, name, first_surname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, userName, name, first_surname, email',
            [userName, name, first_surname, email, password]
        );

        const user = result.rows[0];
        console.log('Usuario registrado:', user);

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: {
                id: user.id,
                userName: user.userName,
                name: user.name,
                first_surname: user.first_surname,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ 
            message: 'Error al registrar usuario',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
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