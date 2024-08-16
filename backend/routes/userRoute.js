import { Router } from 'express';
const router = Router();
import { validateUser, createUser } from '../controllers/userController';

router.post('/register', validateUser, createUser);

export default router;