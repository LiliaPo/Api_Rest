import { Router } from 'express';
import { login, register, validateToken, getAllUsers } from '../backend/controllers/authController';

const router = Router();

router.get('/getAllUsers', getAllUsers);
router.post('/login', login);
router.post('/register', register);
router.post('/validate', validateToken);

export default router; 