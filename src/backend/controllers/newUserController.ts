import { Request, Response } from 'express';
import * as userModel from '../models/userModel.js';

interface UserRegistrationData {
    userName: string;
    name: string;
    first_surname: string;
    email: string;
    password: string;
}

export async function registerUser(req: Request, res: Response): Promise<void> {
    try {
        const userData: UserRegistrationData = req.body;

        if (!validateUserData(userData)) {
            res.status(400).json({ message: "Todos los campos son requeridos" });
            return;
        }

        if (!validatePassword(userData.password)) {
            res.status(400).json({ 
                message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial" 
            });
            return;
        }

        if (!validateEmail(userData.email)) {
            res.status(400).json({ message: "Formato de email inválido" });
            return;
        }

        const existingUser = await userModel.findUserByEmail(userData.email);
        if (existingUser) {
            res.status(400).json({ message: "El email ya está registrado" });
            return;
        }

        const newUser = await userModel.createUser(userData);
        sendSuccessResponse(res, newUser);
    } catch (error) {
        handleRegistrationError(error, res);
    }
}

function validateUserData(data: UserRegistrationData): boolean {
    return Boolean(
        data.userName &&
        data.name &&
        data.first_surname &&
        data.email &&
        data.password
    );
}

function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendSuccessResponse(res: Response, user: any): void {
    res.status(201).json({
        success: true,
        message: "Usuario registrado correctamente",
        user: {
            id: user.id,
            userName: user.userName,
            email: user.email
        }
    });
}

function handleRegistrationError(error: any, res: Response): void {
    console.error('Error en registro:', error);
    res.status(500).json({ message: "Error al registrar usuario" });
} 