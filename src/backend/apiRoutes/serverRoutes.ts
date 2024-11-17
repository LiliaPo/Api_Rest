import { Router } from 'express';
import { getAllUsers } from '../controllers/serverController';

const router = Router();
router.get('/getAllUsers', getAllUsers);

export default router; 