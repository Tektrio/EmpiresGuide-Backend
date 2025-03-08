import express from 'express';
import { registerUser, authUser, getUserProfile, getUsers, checkAdminStatus } from '../controllers/userController';
import { protect, ownerOrAdmin } from '../middleware/auth';

const router = express.Router();

// Rota de registro de usuário - pública
router.post('/register', registerUser);

// Rota de login - pública
router.post('/login', authUser);

// Rota para obter perfil - privada
router.get('/profile', protect, getUserProfile);

// Rota para verificar status de admin - privada
router.get('/admin-check', protect, checkAdminStatus);

// Rota para listar todos os usuários - apenas admin e owner
router.get('/', protect, ownerOrAdmin, getUsers);

export default router; 