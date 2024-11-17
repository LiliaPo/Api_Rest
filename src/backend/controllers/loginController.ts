import { Request, Response } from 'express';
import * as userModel from '../models/userModel.js';

export async function handleLogin(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        if (!validateLoginInput(email, password)) {
            res.status(400).json({ message: "Email y contraseña son requeridos" });
            return;
        }

        const user = await userModel.findUserByEmail(email);

        if (!isValidUser(user, password)) {
            res.status(401).json({ message: "Email o contraseña incorrectos" });
            return;
        }

        sendSuccessResponse(res, user);
    } catch (error) {
        handleLoginError(error, res);
    }
}

function validateLoginInput(email: string, password: string): boolean {
    return Boolean(email && password);
}

function isValidUser(user: any, password: string): boolean {
    return user && user.password === password;
}

function sendSuccessResponse(res: Response, user: any): void {
    res.json({
        success: true,
        user: {
            id: user.id,
            userName: user.userName,
            email: user.email
        }
    });
}

function handleLoginError(error: any, res: Response): void {
    console.error('Error en login:', error);
    res.status(500).json({ message: "Error al iniciar sesión" });
} 