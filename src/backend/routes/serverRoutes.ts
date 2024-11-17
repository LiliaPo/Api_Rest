import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/serverController';

const router = Router();

router.get('/getAllUsers', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router; 