// controllers/notifications.js

// Obtener todas las notificaciones
export const getAllNotifications = (req: any, res: any) => {
    res.json({
        status: "success",
        message: "Lista de todas las notificaciones"
    });
};

// Obtener una notificación por ID
export const getNotificationById = (req: any, res: any) => {
    const { id } = req.params;
    res.json({
        status: "success",
        message: `Detalles de la notificación con ID ${id}`
    });
};
