// controllers/users.js

// Obtener todos los usuarios
export const getAllUsers = (req: any, res: any) => {
    res.json({
        status: "success",
        message: "Lista de todos los usuarios"
    });
};
