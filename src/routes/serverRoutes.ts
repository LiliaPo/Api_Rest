import { Router } from 'express';
import { getAllUsers } from '../backend/controllers/serverController';

const router = Router();
router.get('/getAllUsers', getAllUsers);

export default router; 